import { getDb } from '@/lib/db';
import { adminSessions } from '@/db/schema';
import { eq } from 'drizzle-orm';

const textEncoder = new TextEncoder();
const SESSION_COOKIE = 'vmid_session';

const toHex = (buffer: ArrayBuffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');

export const sha256 = async (value: string) => toHex(await crypto.subtle.digest('SHA-256', textEncoder.encode(value)));

export const createSession = async () => {
  const token = crypto.randomUUID() + crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
  await getDb().insert(adminSessions).values({
    id: crypto.randomUUID(),
    sessionTokenHash: await sha256(token),
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString()
  });

  return {
    token,
    cookie: `${SESSION_COOKIE}=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=604800`
  };
};

export const clearSessionCookie = () => `${SESSION_COOKIE}=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`;

export const isAuthed = async (cookieHeader?: string | null) => {
  const token = cookieHeader
    ?.split(';')
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${SESSION_COOKIE}=`))
    ?.split('=')[1];

  if (!token) return false;
  const hash = await sha256(token);
  const rows = await getDb().select().from(adminSessions).where(eq(adminSessions.sessionTokenHash, hash));
  const session = rows[0];
  if (!session) return false;
  return new Date(session.expiresAt) > new Date();
};

export const checkAdminPassword = async (input: string, expected: string) => {
  const hash = await sha256(input);
  const expectedHash = expected.length > 40 ? expected : await sha256(expected);
  return hash === expectedHash;
};
