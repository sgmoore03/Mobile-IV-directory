export const dynamic = 'force-dynamic';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin';
import { getDb } from '@/lib/db';
import { leads } from '@/db/schema';


export default async function AdminLeadsPage() {
  await requireAdmin();
  const rows = await getDb().select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Leads</h1>
      <div className="space-y-2">
        {rows.map((lead) => (
          <div key={lead.id} className="rounded border p-3 text-sm">
            <p><strong>{lead.type}</strong> — {lead.name}</p>
            <p>{lead.email} {lead.phone}</p>
            <p>{lead.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
