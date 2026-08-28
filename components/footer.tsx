'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from '@/lib/types';

type FooterProps = {
  categories: Category[];
};

export function Footer({ categories }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Join the Maison list
            </h2>
            <p className="mt-2 text-background/60">
              Be first to know about new arrivals, exclusive offers, and
              member-only events.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md gap-2"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-background/20 bg-background/10 text-background placeholder:text-background/40"
            />
            <Button
              type="submit"
              variant="secondary"
              className="shrink-0 rounded-full bg-background text-foreground hover:bg-background/90"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Maison
          </Link>
          <p className="mt-4 max-w-xs text-sm text-background/50">
            Curated goods for modern living. Thoughtfully designed, built to
            last.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 transition-colors hover:bg-background/10"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-background/40">
            Shop
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/shop"
                className="text-sm text-background/70 transition-colors hover:text-background"
              >
                All Products
              </Link>
            </li>
            {categories.slice(0, 4).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-background/40">
            Company
          </h3>
          <ul className="mt-4 space-y-3">
            {['About Us', 'Sustainability', 'Careers', 'Press', 'Contact'].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-background/40">
            Support
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              'Shipping & Returns',
              'Warranty',
              'Size Guide',
              'FAQ',
              'Track Order',
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-background/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Maison. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-background">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-background">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-background">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
