import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAuthed } from './security';

export async function requireAdmin() {
  const h = await headers();
  const ok = await isAuthed(h.get('cookie'));
  if (!ok) redirect('/admin/login');
}
