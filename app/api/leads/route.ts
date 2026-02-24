import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { leads, providers } from '@/db/schema';
import { sendLeadEmail } from '@/lib/email';
import { leadSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';


export async function POST(req: Request) {
  const ip = req.headers.get('cf-connecting-ip') ?? 'unknown';
  if (!checkRateLimit(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const parsed = leadSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const payload = parsed.data;
  await getDb().insert(leads).values({
    id: crypto.randomUUID(),
    providerId: payload.providerId ?? null,
    type: payload.type,
    name: payload.name,
    email: payload.email ?? null,
    phone: payload.phone ?? null,
    message: payload.message,
    createdAt: new Date().toISOString()
  });

  let providerEmail: string | undefined;
  if (payload.providerId) {
    const provider = await getDb().select().from(providers).where(eq(providers.id, payload.providerId)).limit(1);
    providerEmail = provider[0]?.providerEmail ?? undefined;
  }

  await sendLeadEmail(
    `New ${payload.type} lead from ${payload.name}`,
    `<p>${payload.message}</p><p>Email: ${payload.email ?? 'N/A'} Phone: ${payload.phone ?? 'N/A'}</p>`,
    providerEmail ? [providerEmail] : undefined
  );

  return NextResponse.json({ ok: true });
}
