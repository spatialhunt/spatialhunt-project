/* eslint-disable @typescript-eslint/no-unsafe-call */
import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Load .env first, then .env.local overrides
config({ path: '.env' });
config({ path: '.env.local', override: true });

const DATABASE_URL = process.env.DATABASE_URL;
const DIRECT_URL   = process.env.DIRECT_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Check your .env or .env.local file.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Use DIRECT_URL for prisma db push / migrate (bypasses pgbouncer)
    // Falls back to DATABASE_URL if DIRECT_URL not set
    url: DIRECT_URL ?? DATABASE_URL,
  },
});
