import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@shared/schema';
import { log } from './vite';

// Get database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  log('DATABASE_URL environment variable is not set. Using in-memory storage fallback.');
}

// Create a SQL client with Neon
const sql = databaseUrl ? neon(databaseUrl) : null;

// Create a database instance with Drizzle
export const db = sql ? drizzle(sql, { schema }) : null;

// Export a function to check if database is available
export const isDatabaseAvailable = () => !!db;
