import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Prisma 7 no longer auto-loads .env files, so load them for local CLI use.
// On Vercel/CI, env vars are already in process.env and these are no-ops.
config({ path: '.env', quiet: true });
config({ path: '.env.local', override: true, quiet: true });

const DATABASE_URL = process.env.DATABASE_URL;
const DIRECT_URL   = process.env.DIRECT_URL;

// IMPORTANT: do NOT throw when DATABASE_URL is missing.
// `prisma generate` (run from the `postinstall` script) does not need a
// database connection, and throwing here breaks `npm install` on Vercel/CI
// whenever the env var is not available at install time. Commands that do
// need a database (db push, migrate, studio) will fail with a clear Prisma
// error on their own.
if (!DATABASE_URL && !DIRECT_URL) {
  console.warn(
    '[prisma.config] DATABASE_URL is not set — `prisma generate` will work, but db commands will not.',
  );
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Use DIRECT_URL for prisma db push / migrate (bypasses pgbouncer).
    // Falls back to DATABASE_URL, then to a placeholder so `generate` works.
    url:
      DIRECT_URL ??
      DATABASE_URL ??
      'postgresql://placeholder:placeholder@localhost:5432/placeholder',
  },
});
