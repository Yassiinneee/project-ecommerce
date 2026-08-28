import { ProductGrid } from '@/components/product-grid';
import { getProducts, getCategories } from '@/lib/data';

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Shop All Products
          </h1>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Browse our full collection of thoughtfully designed goods for modern
            living.
          </p>
        </div>
      </div>
      <ProductGrid
        products={products}
        categories={categories}
        title="All Products"
        subtitle={`${products.length} products available`}
      />
    </>
  );
}
