import { Hero } from '@/components/hero';
import { CategoryShowcase } from '@/components/category-showcase';
import { FeaturedProducts } from '@/components/featured-products';
import { FeatureBanner } from '@/components/feature-banner';
import { PromoBanner } from '@/components/promo-banner';
import { Testimonials } from '@/components/testimonials';
import { getCategories, getFeaturedProducts } from '@/lib/data';

export default async function Home() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Hero />
      <FeatureBanner />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <PromoBanner />
      <Testimonials />
    </>
  );
}
