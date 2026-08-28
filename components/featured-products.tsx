import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import type { ProductWithCategory } from '@/lib/types';

export function FeaturedProducts({
  products,
}: {
  products: ProductWithCategory[];
}) {
  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            Editor's Picks
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Our most-loved pieces, chosen by the Maison team for their quality,
            design, and craftsmanship.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          View all products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
