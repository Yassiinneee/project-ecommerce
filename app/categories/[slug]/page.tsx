import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProductGrid } from '@/components/product-grid';
import {
  getCategories,
  getProductsByCategory,
} from '@/lib/data';

type CategoryPageProps = {
  params: { slug: string };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) notFound();

  const products = await getProductsByCategory(params.slug);

  return (
    <>
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{category.name}</span>
          </nav>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-lg text-muted-foreground">
            {products.length} product{products.length !== 1 ? 's' : ''} in this
            collection.
          </p>
        </div>
      </div>
      <ProductGrid
        products={products}
        categories={categories}
        title={category.name}
        subtitle={`Explore our ${category.name.toLowerCase()} collection`}
      />
    </>
  );
}
