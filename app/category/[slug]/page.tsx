export const dynamic = 'force-dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { searchProviders, listAreas } from '@/lib/providers';
import { formatPriceRange } from '@/lib/utils';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mobile IV Therapy in Las Vegas',
    description: 'Browse mobile IV therapy providers in Las Vegas with area and hotel-visit filters.'
  };
}

export default async function CategoryPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const q = params.q ?? '';
  const area = params.area ?? '';
  const hotelVisits = params.hotelVisits ?? '';
  const featured = params.featured ?? '';
  const [results, areas] = await Promise.all([searchProviders(q, area, hotelVisits, featured), listAreas()]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mobile IV Therapy Providers</h1>
      <form className="grid gap-3 rounded-lg border p-4 md:grid-cols-4">
        <input name="q" defaultValue={q} className="h-10 rounded-md border px-3" placeholder="Search" />
        <select name="area" defaultValue={area} className="h-10 rounded-md border px-3">
          <option value="">All areas</option>
          {areas.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select name="hotelVisits" defaultValue={hotelVisits} className="h-10 rounded-md border px-3">
          <option value="">Hotel visits: any</option><option value="yes">Yes</option><option value="no">No</option>
        </select>
        <select name="featured" defaultValue={featured} className="h-10 rounded-md border px-3">
          <option value="">Featured: any</option><option value="yes">Yes</option><option value="no">No</option>
        </select>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground md:col-span-4">Apply filters</button>
      </form>
      <div className="space-y-3">
        {results.map((provider) => (
          <div key={provider.id} className="rounded-lg border p-4">
            <Link href={`/providers/${provider.slug}`} className="text-lg font-semibold hover:underline">{provider.name}</Link>
            <p className="text-sm text-muted-foreground">{provider.description}</p>
            <p className="text-sm">{formatPriceRange(provider.priceMin, provider.priceMax)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
