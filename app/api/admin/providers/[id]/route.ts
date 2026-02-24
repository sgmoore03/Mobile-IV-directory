import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDb } from '@/lib/db';
import { providers } from '@/db/schema';
import { isAuthed } from '@/lib/security';
import { normalizeProviderPayload, providerSchema } from '@/lib/validation';


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const h = await headers();
  if (!(await isAuthed(h.get('cookie')))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = providerSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { id } = await params;

  await getDb()
    .update(providers)
    .set({ ...normalizeProviderPayload(parsed.data), updatedAt: new Date().toISOString() })
    .where(eq(providers.id, id));

  return NextResponse.json({ ok: true });
}
