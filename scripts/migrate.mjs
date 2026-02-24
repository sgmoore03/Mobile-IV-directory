import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createClient } from '@libsql/client';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is required for migrations.');

const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const files = (await readdir('migrations')).filter((f) => f.endsWith('.sql')).sort();
for (const file of files) {
  const sql = await readFile(join('migrations', file), 'utf8');
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await client.execute(statement);
  }
  console.log(`Applied ${file}`);
}
