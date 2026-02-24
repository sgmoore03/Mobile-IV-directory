import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { getAppEnv } from './env';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (dbInstance) return dbInstance;

  const env = getAppEnv();
  const url = env.DATABASE_URL;
  if (!url) throw new Error('Database URL is missing. Set DATABASE_URL (or TURSO_DATABASE_URL/LIBSQL_URL).');

  const client = createClient({
    url,
    authToken: env.DATABASE_AUTH_TOKEN
  });

  dbInstance = drizzle(client);
  return dbInstance;
};
