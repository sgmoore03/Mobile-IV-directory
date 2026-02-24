export const dynamic = 'force-dynamic';
import { ProviderForm } from '@/components/provider-form';
import { requireAdmin } from '@/lib/admin';


export default async function NewProviderPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Create provider</h1>
      <ProviderForm />
    </div>
  );
}
