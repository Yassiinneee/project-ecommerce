'use client';

import { useState } from 'react';
import { ShoppingBag, Minus, Plus, Heart, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { useCart } from '@/lib/cart-context';
import { formatPrice, calculateDiscountPercent } from '@/lib/data';
import type { ProductWithCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

type ProductInfoProps = {
  product: ProductWithCategory;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, justAddedId } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const discount = calculateDiscountPercent(
    product.price,
    product.compare_at_price
  );
  const justAdded = justAddedId === product.id;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Category */}
      {product.category && (
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {product.category.name}
        </span>
      )}

      {/* Title */}
      <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <StarRating
        rating={product.rating}
        size="md"
        showValue
        count={product.review_count}
      />

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.compare_at_price && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compare_at_price)}
            </span>
            {discount && (
              <Badge className="bg-destructive text-white">
                Save {discount}%
              </Badge>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      {/* Stock */}
      <div className="flex items-center gap-2 text-sm">
        {product.stock > 0 ? (
          <>
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <span className="font-medium text-foreground">In Stock</span>
            <span className="text-muted-foreground">
              {product.stock} available
            </span>
          </>
        ) : (
          <>
            <span className="flex h-2 w-2 rounded-full bg-destructive" />
            <span className="font-medium text-destructive">Out of Stock</span>
          </>
        )}
      </div>

      {/* Quantity + Add to cart */}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-1 rounded-full border border-border p-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-base font-semibold">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Button
          onClick={handleAddToCart}
          size="lg"
          className={cn(
            'flex-1 rounded-full',
            justAdded && 'bg-green-600 hover:bg-green-600'
          )}
        >
          {justAdded ? (
            <>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart — {formatPrice(product.price * quantity)}
            </>
          )}
        </Button>
        <button
          onClick={() => setLiked((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              'h-5 w-5',
              liked ? 'fill-destructive text-destructive' : 'text-foreground'
            )}
          />
        </button>
      </div>

      {/* Trust badges */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-6">
        {[
          { icon: Truck, label: 'Free shipping over $150' },
          { icon: RefreshCw, label: '30-day free returns' },
          { icon: ShieldCheck, label: '2-year warranty' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <item.icon className="h-5 w-5 text-accent" />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
