'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type Provider = Record<string, string | number | null | undefined>;

export function ProviderForm({ provider }: { provider?: Provider }) {
  const [status, setStatus] = useState('');
  const editing = Boolean(provider?.id);
  return (
    <form
      className="grid gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = Object.fromEntries(formData.entries());
        const endpoint = editing ? `/api/admin/providers/${provider?.id}` : '/api/admin/providers';
        const method = editing ? 'PUT' : 'POST';
        const res = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        setStatus(res.ok ? 'Saved.' : 'Error saving provider.');
      }}
    >
      <Input name="name" defaultValue={(provider?.name as string) ?? ''} placeholder="Name" required />
      <Input name="slug" defaultValue={(provider?.slug as string) ?? ''} placeholder="Slug (optional)" />
      <Textarea name="description" defaultValue={(provider?.description as string) ?? ''} placeholder="Description" required />
      <Input name="phone" defaultValue={(provider?.phone as string) ?? ''} placeholder="Phone" required />
      <Input name="websiteUrl" defaultValue={(provider?.websiteUrl as string) ?? ''} placeholder="https://..." required />
      <Input name="bookingUrl" defaultValue={(provider?.bookingUrl as string) ?? ''} placeholder="Booking URL" />
      <Input name="providerEmail" defaultValue={(provider?.providerEmail as string) ?? ''} placeholder="Provider Email" />
      <Input name="priceMin" type="number" defaultValue={(provider?.priceMin as number) ?? undefined} placeholder="Min price" />
      <Input name="priceMax" type="number" defaultValue={(provider?.priceMax as number) ?? undefined} placeholder="Max price" />
      <Input name="responseTimeMins" type="number" defaultValue={(provider?.responseTimeMins as number) ?? undefined} placeholder="Response mins" />
      <Input name="hoursJson" defaultValue={(provider?.hoursJson as string) ?? '{"daily":"24/7"}'} required />
      <Input name="servicesJson" defaultValue={(provider?.servicesJson as string) ?? '["Hydration","Recovery"]'} required />
      <Input name="areasServedJson" defaultValue={(provider?.areasServedJson as string) ?? '["The Strip"]'} required />
      <label className="text-sm">Hotel visits <Input name="hotelVisits" type="number" min={0} max={1} defaultValue={(provider?.hotelVisits as number) ?? 0} /></label>
      <label className="text-sm">Featured <Input name="featured" type="number" min={0} max={1} defaultValue={(provider?.featured as number) ?? 0} /></label>
      <label className="text-sm">Verified <Input name="verified" type="number" min={0} max={1} defaultValue={(provider?.verified as number) ?? 0} /></label>
      <Button type="submit">{editing ? 'Update' : 'Create'} Provider</Button>
      {status ? <p className="text-sm">{status}</p> : null}
    </form>
  );
}
