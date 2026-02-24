import { NextResponse } from 'next/server';
import { searchProviders } from '@/lib/providers';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const rows = await searchProviders(q);
  return NextResponse.json(rows);
}
