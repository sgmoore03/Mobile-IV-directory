export const dynamic = 'force-dynamic';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ProviderForm } from '@/components/provider-form';
import { requireAdmin } from '@/lib/admin';
import { getDb } from '@/lib/db';
import { providers } from '@/db/schema';


export default async function EditProviderPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const rows = await getDb().select().from(providers).where(eq(providers.id, id)).limit(1);
  if (!rows[0]) notFound();
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Edit provider</h1>
      <ProviderForm provider={rows[0]} />
    </div>
  );
}
