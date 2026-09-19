import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// ─── Lazy singleton ──────────────────────────────────────────────────────────
// Pool and PrismaClient are created on first access, NOT at module import time.
// This prevents pg from attempting a TCP connection to Postgres during the
// Next.js compile/bundle step when no database is available.

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: pg.Pool | undefined;
};

function getPool(): pg.Pool {
  if (globalForPrisma.pgPool) return globalForPrisma.pgPool;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env before making database calls.",
    );
  }

  let pool: pg.Pool;

  // Supabase connection pooler uses a dot in the username which the pg URL
  // parser misreads as part of the hostname — pass params explicitly.
  if (url.includes("pooler.supabase.com")) {
    const parsed = new URL(url);
    pool = new pg.Pool({
      user:     decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      host:     parsed.hostname,
      port:     parsed.port ? parseInt(parsed.port) : 6543,
      database: parsed.pathname.slice(1) || "postgres",
      ssl:      { rejectUnauthorized: false },
    });
  } else {
    pool = new pg.Pool({
      connectionString: url,
      // Only require SSL in production; skip for local dev
      ssl: process.env.NODE_ENV === "production"
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
  const client = new PrismaClient({ adapter });

  globalForPrisma.prisma = client;
  return client;
}

// ─── Exported accessor ───────────────────────────────────────────────────────
// Use this everywhere instead of `new PrismaClient()`.
// The underlying pool is only opened when a query is first executed.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
