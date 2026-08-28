'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

type HeaderProps = {
  categories: Category[];
};

const navLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Featured', href: '/#featured' },
  { label: 'About', href: '/#about' },
];

export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent bg-background'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: mobile menu + desktop nav */}
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="group relative">
                <button className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                  Categories
                </button>
                <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="w-56 rounded-xl border border-border bg-popover p-2 shadow-xl">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight text-foreground"
          >
            Maison
          </Link>

          {/* Right: search + cart */}
          <div className="flex items-center gap-3">
            <button
              className="hidden sm:block"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={openCart}
              className="relative flex items-center"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] animate-[slide-in-from-left_0.3s_ease-out] bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <span className="px-3 text-xs uppercase tracking-wider text-muted-foreground">
                Categories
              </span>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
