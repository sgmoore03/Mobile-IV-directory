const globalAny = globalThis as unknown as { __rate?: Map<string, { count: number; ts: number }> };
const map = globalAny.__rate ?? new Map<string, { count: number; ts: number }>();
globalAny.__rate = map;

export function checkRateLimit(key: string, max = 8, windowMs = 60_000) {
  const now = Date.now();
  const existing = map.get(key);
  if (!existing || now - existing.ts > windowMs) {
    map.set(key, { count: 1, ts: now });
    return true;
  }
  if (existing.count >= max) return false;
  existing.count += 1;
  map.set(key, existing);
  return true;
}
