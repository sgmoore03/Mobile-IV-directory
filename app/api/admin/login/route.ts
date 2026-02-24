import { NextResponse } from 'next/server';
import { createSession, checkAdminPassword } from '@/lib/security';
import { getAppEnv } from '@/lib/env';


export async function POST(req: Request) {
  const body = (await req.json()) as { password?: string };
  const password = String(body.password ?? "");
  const env = getAppEnv();
  const expected = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';

  if (!expected || !(await checkAdminPassword(password, expected))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const session = await createSession();
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', session.cookie);
  return res;
}
