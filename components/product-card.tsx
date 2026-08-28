'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { useCart } from '@/lib/cart-context';
import {
  formatPrice,
  calculateDiscountPercent,
} from '@/lib/data';
import type { ProductWithCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

type ProductCardProps = {
  product: ProductWithCategory;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, justAddedId } = useCart();
  const [liked, setLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image_url);

  const discount = calculateDiscountPercent(
    product.price,
    product.compare_at_price
  );

  const justAdded = justAddedId === product.id;

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => {
              if (product.gallery && product.gallery.length > 0) {
                setImgSrc(product.gallery[0]);
              }
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge
              variant={product.badge === 'Sale' ? 'destructive' : 'default'}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
                product.badge === 'New' && 'bg-foreground text-background',
                product.badge === 'Bestseller' &&
                  'bg-accent text-accent-foreground',
                product.badge === 'Sale' && 'bg-destructive text-white'
              )}
            >
              {product.badge}
            </Badge>
          )}
          {discount && (
            <Badge className="rounded-full bg-foreground/90 px-3 py-1 text-xs font-semibold text-background shadow-sm">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              liked ? 'fill-destructive text-destructive' : 'text-foreground'
            )}
          />
        </button>

        {/* Quick add to cart */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[120%] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            onClick={() => addItem(product)}
            className={cn(
              'w-full rounded-full shadow-lg transition-all',
              justAdded && 'bg-green-600 hover:bg-green-600'
            )}
          >
            {justAdded ? (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-3 flex flex-col gap-1 px-1">
        {product.category && (
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category.name}
          </span>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="font-medium leading-tight text-foreground transition-colors hover:text-accent"
        >
          {product.name}
        </Link>
        <StarRating rating={product.rating} count={product.review_count} />
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
