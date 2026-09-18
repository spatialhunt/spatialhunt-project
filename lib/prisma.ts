import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Parse the DATABASE_URL to handle Supabase pooler's dot-in-username issue.
// The pg driver misparses "postgres.PROJECT_REF" as a hostname component,
// so we pass connection parameters explicitly instead of as a connection string.
function createPool() {
  const url = process.env.DATABASE_URL!;

  // If using Supabase pooler (contains .pooler.supabase.com), parse manually
  if (url.includes('pooler.supabase.com')) {
    const parsed = new URL(url);
    return new pg.Pool({
      user:     decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      host:     parsed.hostname,
      port:     parsed.port ? parseInt(parsed.port) : 6543,
      database: parsed.pathname.slice(1) || 'postgres',
      ssl:      { rejectUnauthorized: false },
    });
  }

  // Standard connection string (direct or local)
  return new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
}

const pool = createPool();
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
