# VegasMobileIV.directory

SEO-first mobile IV therapy directory for Las Vegas built with Next.js App Router, Tailwind, Drizzle ORM, and libSQL (Turso-compatible), deployable on Vercel.

## Stack
- Next.js 15 + TypeScript (App Router)
- Tailwind CSS with lightweight shadcn-style components
- Drizzle ORM + libSQL (`@libsql/client`)
- Resend email via HTTPS API
- Admin auth with hashed cookie sessions (Web Crypto)

## Local development
1. Install dependencies:
   ```bash
   npm i
   ```
2. Copy env values:
   ```bash
   cp .env.example .env
   ```
3. Set `DATABASE_URL` in `.env`:
   - Local SQLite: `file:./local.db`
   - Turso: `libsql://<db-name>-<org>.turso.io`
4. Run migrations:
   ```bash
   npm run db:migrate
   ```
5. Seed sample providers:
   ```bash
   npm run db:seed
   ```
6. Start dev server:
   ```bash
   npm run dev
   ```

## Vercel deployment
1. Import this repository into Vercel.
2. Build command: `npm run build`
3. Output: default Next.js output (no custom setting needed).
4. Set environment variables in Vercel project settings:
   - `DATABASE_URL`
   - `DATABASE_AUTH_TOKEN` (only for remote Turso/libSQL)
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY`
   - `SITE_OWNER_EMAIL`
   - `APP_BASE_URL`
   - `NEXT_PUBLIC_SITE_NAME`
5. Run migrations against production DB once:
   ```bash
   DATABASE_URL=<your-prod-db-url> DATABASE_AUTH_TOKEN=<token-if-needed> npm run db:migrate
   ```

## Database scripts
- `npm run db:migrate` runs SQL files in `migrations/` against `DATABASE_URL`.
- `npm run db:seed` inserts 10 realistic providers for Las Vegas areas.

## Deploy from CLI
```bash
npm run deploy
```
