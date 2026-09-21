import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// ─── Lazy singleton ──────────────────────────────────────────────────────────
// Pool and PrismaClient are created on first access, NOT at module import time.
// This prevents pg from attempting a TCP connection during the build step.

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: pg.Pool | undefined;
};

function getPool(): pg.Pool {
  if (globalForPrisma.pgPool) return globalForPrisma.pgPool;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local before making database calls.",
    );
  }

  let pool: pg.Pool;

  // Supabase connection pooler (pooler.supabase.com) uses PgBouncer on port 6543.
  // The username in the pooler URL is "postgres.PROJECT_REF" — pg's URL parser
  // can misread the dot as a hostname separator, so we parse params explicitly.
  if (url.includes("pooler.supabase.com")) {
    const parsed = new URL(url);
    pool = new pg.Pool({
      user:     decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      host:     parsed.hostname,
      port:     parsed.port ? parseInt(parsed.port, 10) : 6543,
      database: parsed.pathname.replace(/^\//, "") || "postgres",
      ssl:      { rejectUnauthorized: false },
      // PgBouncer in transaction mode doesn't support prepared statements
      max:              10,
      idleTimeoutMillis: 30_000,
    });
  } else {
    // Direct connection (local dev or non-Supabase)
    pool = new pg.Pool({
      connectionString: url,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
  }

  globalForPrisma.pgPool = pool;
  return pool;
}

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const adapter = new PrismaPg(getPool());
  const client  = new PrismaClient({ adapter });

  globalForPrisma.prisma = client;
  return client;
}

// ─── Exported accessor ───────────────────────────────────────────────────────
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
