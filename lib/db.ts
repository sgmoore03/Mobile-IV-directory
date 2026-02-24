import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { getAppEnv } from './env';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (dbInstance) return dbInstance;

  const env = getAppEnv();
  const url = env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is missing.');

  const client = createClient({
    url,
    authToken: env.DATABASE_AUTH_TOKEN
  });

  dbInstance = drizzle(client);
  return dbInstance;
};
