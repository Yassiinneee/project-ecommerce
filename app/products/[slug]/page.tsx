import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { ProductGallery } from '@/components/product-gallery';
import { ProductInfo } from '@/components/product-info';
import { ReviewsSection } from '@/components/reviews-section';
import { ProductCard } from '@/components/product-card';
import {
  getProductBySlug,
  getReviews,
  getProductsByCategory,
} from '@/lib/data';

type ProductPageProps = {
  params: { slug: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) notFound();

  const [reviews, relatedProducts] = await Promise.all([
    getReviews(product.id),
    product.category
      ? getProductsByCategory(product.category.slug).then((products) =>
          products.filter((p) => p.id !== product.id).slice(0, 4)
        )
      : Promise.resolve([]),
  ]);

  const galleryImages = [
    product.image_url,
    ...(product.gallery ?? []),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          {product.category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-foreground"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={galleryImages} alt={product.name} />
          <div className="lg:py-4">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <ReviewsSection
            productId={product.id}
            initialReviews={reviews}
            rating={product.rating}
            reviewCount={product.review_count}
          />
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              You might also like
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 4} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
