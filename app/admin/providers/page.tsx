export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { getAllProviders } from '@/lib/providers';


export default async function AdminProvidersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireAdmin();
  const q = (await searchParams).q?.toLowerCase() ?? '';
  const providers = (await getAllProviders()).filter((p) => p.name.toLowerCase().includes(q));

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Providers</h1>
        <Link className="rounded bg-primary px-3 py-2 text-primary-foreground" href="/admin/providers/new">New Provider</Link>
      </div>
      <form><input className="h-10 rounded border px-3" name="q" placeholder="Search" defaultValue={q} /></form>
      <div className="space-y-2">
        {providers.map((p) => (
          <Link key={p.id} href={`/admin/providers/${p.id}`} className="block rounded border p-3">{p.name}</Link>
        ))}
      </div>
    </div>
  );
}
