export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedProviders, listAreas, parseJsonArray } from '@/lib/providers';
import { formatPriceRange } from '@/lib/utils';

export default async function HomePage() {
  const [featured, areas] = await Promise.all([getFeaturedProviders(), listAreas()]);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Las Vegas Mobile IV Therapy Directory</h1>
        <p className="text-muted-foreground">Find trusted providers by area, services, and response speed.</p>
        <form action="/category/mobile-iv-therapy" className="flex gap-2 pt-2">
          <input className="h-10 w-full max-w-md rounded-md border px-3" name="q" placeholder="Search provider or service" />
          <button className="rounded-md bg-primary px-4 text-primary-foreground">Search</button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Popular areas</h2>
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <Link key={area} href={`/area/${area.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-full border px-3 py-1 text-sm">
              {area}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Featured providers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((provider) => (
            <Card key={provider.id}>
              <div className="space-y-2">
                <Link href={`/providers/${provider.slug}`} className="text-lg font-semibold hover:underline">
                  {provider.name}
                </Link>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
                <div className="flex flex-wrap gap-1">
                  {parseJsonArray(provider.areasServedJson).slice(0, 3).map((area) => (
                    <Badge key={area}>{area}</Badge>
                  ))}
                </div>
                <p className="text-sm">{formatPriceRange(provider.priceMin, provider.priceMax)}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
