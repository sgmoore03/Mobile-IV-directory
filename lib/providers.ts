import { and, desc, eq, like, or, sql } from 'drizzle-orm';
import { providers } from '@/db/schema';
import { getDb } from './db';

export type Provider = typeof providers.$inferSelect;

export const parseJsonArray = (value: string) => {
  try {
    return JSON.parse(value) as string[];
  } catch {
    return [];
  }
};

export async function getFeaturedProviders() {
  return getDb().select().from(providers).where(eq(providers.featured, 1)).limit(6);
}

export async function getAllProviders() {
  return getDb().select().from(providers).orderBy(desc(providers.createdAt));
}

export async function getProviderBySlug(slug: string) {
  const rows = await getDb().select().from(providers).where(eq(providers.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function searchProviders(query: string, area?: string, hotelVisits?: string, featured?: string) {
  const filters = [];
  if (query) {
    filters.push(
      or(
        like(providers.name, `%${query}%`),
        like(providers.description, `%${query}%`),
        like(providers.servicesJson, `%${query}%`),
        like(providers.areasServedJson, `%${query}%`)
      )
    );
  }
  if (area) filters.push(like(providers.areasServedJson, `%${area}%`));
  if (hotelVisits) filters.push(eq(providers.hotelVisits, hotelVisits === 'yes' ? 1 : 0));
  if (featured) filters.push(eq(providers.featured, featured === 'yes' ? 1 : 0));

  return getDb()
    .select()
    .from(providers)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(providers.featured), providers.name);
}

export async function listAreas() {
  const rows = await getDb().select({ areas: providers.areasServedJson }).from(providers);
  const areas = new Set<string>();
  for (const row of rows) {
    parseJsonArray(row.areas).forEach((a) => areas.add(a));
  }
  return [...areas];
}
