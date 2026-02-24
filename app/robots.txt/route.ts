import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function GET() {
  const base = process.env.APP_BASE_URL ?? 'https://vegasmobileiv.directory';
  return new NextResponse(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
