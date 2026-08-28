import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';
import { getCategories } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maison.example.com'),
  title: 'Maison — Curated Goods for Modern Living',
  description:
    'Discover thoughtfully designed products for everyday life. Audio, wearables, footwear, accessories, and more.',
  openGraph: {
    title: 'Maison — Curated Goods for Modern Living',
    description:
      'Discover thoughtfully designed products for everyday life.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header categories={categories} />
            <main className="flex-1">{children}</main>
            <Footer categories={categories} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
