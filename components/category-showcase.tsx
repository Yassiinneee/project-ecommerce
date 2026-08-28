import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/types';

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Find exactly what you're looking for.
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
          >
            {category.image_url && (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/70 transition-colors group-hover:text-white">
                Shop now
                <ArrowRight className="h-3 w-3" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
