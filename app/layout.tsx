import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_BASE_URL ?? 'https://vegasmobileiv.directory'),
  title: {
    default: 'VegasMobileIV.directory | Mobile IV Therapy in Las Vegas',
    template: '%s | VegasMobileIV.directory'
  },
  description: 'Find trusted mobile IV therapy providers across Las Vegas neighborhoods and hotels.',
  openGraph: {
    title: 'VegasMobileIV.directory',
    description: 'Las Vegas mobile IV therapy directory',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container flex items-center justify-between py-4">
            <Link className="text-xl font-bold" href="/">
              {process.env.NEXT_PUBLIC_SITE_NAME ?? 'VegasMobileIV.directory'}
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/category/mobile-iv-therapy">Category</Link>
              <Link href="/admin/login">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
