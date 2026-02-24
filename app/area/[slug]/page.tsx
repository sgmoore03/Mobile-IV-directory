export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { searchProviders } from '@/lib/providers';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = slug.replace(/-/g, ' ');
  return {
    title: `${area} Mobile IV Therapy`,
    description: `Providers serving ${area} in Las Vegas.`
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = slug.replace(/-/g, ' ');
  const results = await searchProviders('', area);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold capitalize">{area} providers</h1>
      {results.map((provider) => (
        <Link key={provider.id} className="block rounded border p-3 hover:bg-muted" href={`/providers/${provider.slug}`}>
          {provider.name}
        </Link>
      ))}
    </div>
  );
}
