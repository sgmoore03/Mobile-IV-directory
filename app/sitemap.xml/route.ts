import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getAllProviders } from '@/lib/providers';


export async function GET() {
  const base = process.env.APP_BASE_URL ?? 'https://vegasmobileiv.directory';
  const providers = await getAllProviders();
  const urls = [
    '',
    '/category/mobile-iv-therapy',
    ...providers.map((p) => `/providers/${p.slug}`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((path) => `<url><loc>${base}${path}</loc></url>`)
    .join('')}</urlset>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
