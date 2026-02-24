import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDb } from '@/lib/db';
import { providers } from '@/db/schema';
import { isAuthed } from '@/lib/security';
import { normalizeProviderPayload, providerSchema } from '@/lib/validation';


export async function POST(req: Request) {
  const h = await headers();
  if (!(await isAuthed(h.get('cookie')))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = providerSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const payload = normalizeProviderPayload(parsed.data);
  const now = new Date().toISOString();
  await getDb().insert(providers).values({
    id: crypto.randomUUID(),
    ...payload,
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ ok: true });
}
