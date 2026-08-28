import { supabaseServer } from './supabase-server';
import type { Category, Product, ProductWithCategory, Review } from './types';

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return (data as Category[]) ?? [];
}

export async function getFeaturedProducts(): Promise<ProductWithCategory[]> {
  const { data, error } = await supabaseServer
    .from('products')
    .select('*, category:categories(id,name,slug)')
    .eq('featured', true)
    .order('rating', { ascending: false });

  if (error) throw error;
  return (data as ProductWithCategory[]) ?? [];
}

export async function getProducts(): Promise<ProductWithCategory[]> {
  const { data, error } = await supabaseServer
    .from('products')
    .select('*, category:categories(id,name,slug)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as ProductWithCategory[]) ?? [];
}

export async function getProductsByCategory(
  slug: string
): Promise<ProductWithCategory[]> {
  const { data: category } = await supabaseServer
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (!category) return [];

  const { data, error } = await supabaseServer
    .from('products')
    .select('*, category:categories(id,name,slug)')
    .eq('category_id', category.id)
    .order('rating', { ascending: false });

  if (error) throw error;
  return (data as ProductWithCategory[]) ?? [];
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithCategory | null> {
  const { data, error } = await supabaseServer
    .from('products')
    .select('*, category:categories(id,name,slug)')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return (data as ProductWithCategory) ?? null;
}

export async function getReviews(productId: string): Promise<Review[]> {
  const { data, error } = await supabaseServer
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as Review[]) ?? [];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function calculateDiscountPercent(
  price: number,
  compareAtPrice: number | null
): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
