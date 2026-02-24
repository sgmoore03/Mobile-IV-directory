export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { LeadForm } from '@/components/lead-form';
import { formatPriceRange } from '@/lib/utils';
import { getProviderBySlug, parseJsonArray } from '@/lib/providers';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: provider.name,
    description: provider.description,
    alternates: { canonical: `/providers/${provider.slug}` },
    openGraph: { title: provider.name, description: provider.description, type: 'profile' }
  };
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  const areas = parseJsonArray(provider.areasServedJson);
  const services = parseJsonArray(provider.servicesJson);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: provider.name,
    description: provider.description,
    areaServed: areas,
    telephone: provider.phone,
    url: provider.websiteUrl
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div>
        <h1 className="text-3xl font-bold">{provider.name}</h1>
        <p className="text-muted-foreground">{provider.description}</p>
        <div className="mt-2 flex gap-2">
          {provider.featured ? <Badge className="bg-yellow-100">Featured</Badge> : null}
          {provider.verified ? <Badge className="bg-green-100">Verified</Badge> : null}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p><strong>Phone:</strong> <a href={`tel:${provider.phone}`}>{provider.phone}</a></p>
          <p><strong>Website:</strong> <a href={provider.websiteUrl} className="text-primary underline">Visit</a></p>
          {provider.bookingUrl ? <p><strong>Booking:</strong> <a href={provider.bookingUrl} className="text-primary underline">Book now</a></p> : null}
          <p><strong>Price:</strong> {formatPriceRange(provider.priceMin, provider.priceMax)}</p>
          <p><strong>Typical response:</strong> {provider.responseTimeMins ? `<${provider.responseTimeMins} min` : 'Unknown'}</p>
          <p><strong>Hotel visits:</strong> {provider.hotelVisits ? 'Yes' : 'No'}</p>
          <div><strong>Areas:</strong> <div className="mt-1 flex flex-wrap gap-1">{areas.map((a) => <Badge key={a}>{a}</Badge>)}</div></div>
          <div><strong>Services:</strong> <div className="mt-1 flex flex-wrap gap-1">{services.map((s) => <Badge key={s}>{s}</Badge>)}</div></div>
        </div>
        <div className="space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Request availability</h2>
          <LeadForm providerId={provider.id} type="availability" />
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold">Claim this listing</h3>
        <LeadForm providerId={provider.id} type="claim" />
      </div>
    </div>
  );
}
