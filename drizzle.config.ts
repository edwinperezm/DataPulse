import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  schema: './shared/schema.ts',
  out: './drizzle',
  dialect: 'pg',
  driver: 'pg',
  dbCredentials: {
    // For Neon serverless PostgreSQL
    connectionString: process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
});
