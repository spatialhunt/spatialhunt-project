/* eslint-disable @typescript-eslint/no-unsafe-call */
import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Load .env first, then .env.local overrides it
config({ path: '.env' });
config({ path: '.env.local', override: true });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Check your .env or .env.local file.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: DATABASE_URL,
  },
});
