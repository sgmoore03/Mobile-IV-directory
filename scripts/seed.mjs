import { createClient } from '@libsql/client';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is required for seeding.');

const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const now = new Date().toISOString();
const providers = [
  ['Strip Hydration Co','strip-hydration-co','The Strip'],['Desert Drip IV','desert-drip-iv','Downtown'],['Summerlin Wellness IV','summerlin-wellness-iv','Summerlin'],['Henderson Rapid IV','henderson-rapid-iv','Henderson'],['Nightlife Recovery LV','nightlife-recovery-lv','The Strip'],['Vegas Hydrate Now','vegas-hydrate-now','Arts District'],['Concierge IV Medics','concierge-iv-medics','Summerlin'],['Mobile IV Pros LV','mobile-iv-pros-lv','Henderson'],['24/7 Las Vegas Drips','247-las-vegas-drips','The Strip'],['Neon Rehydrate','neon-rehydrate','Downtown']
];

await client.execute('DELETE FROM providers');

for (let i = 0; i < providers.length; i++) {
  const p = providers[i];
  await client.execute({
    sql: `INSERT INTO providers (id,name,slug,description,phone,website_url,booking_url,provider_email,logo_url,price_min,price_max,response_time_mins,hotel_visits,hours_json,services_json,areas_served_json,featured,verified,created_at,updated_at)
          VALUES (?1,?2,?3,?4,?5,?6,?7,?8,NULL,149,399,60,1,?9,?10,?11,?12,?13,?14,?15)`,
    args: [
      crypto.randomUUID(),
      p[0],
      p[1],
      'On-demand hydration and wellness IV services in Las Vegas.',
      `702-555-01${String(i).padStart(2, '0')}`,
      `https://example.com/${p[1]}`,
      `https://example.com/${p[1]}/book`,
      `provider${i}@example.com`,
      '{"daily":"24/7"}',
      '["Hydration","Immunity","Recovery"]',
      `["${p[2]}","The Strip"]`,
      i % 3 === 0 ? 1 : 0,
      i % 2 === 0 ? 1 : 0,
      now,
      now
    ]
  });
}

console.log('Seeded providers');
