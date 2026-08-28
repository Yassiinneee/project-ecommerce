'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/data';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
  } = useCart();

  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 9.95 : 0;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            {itemCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({itemCount} item{itemCount !== 1 ? 's' : ''})
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your cart items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Discover something you'll love.
              </p>
            </div>
            <Button asChild onClick={closeCart} className="mt-2">
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b border-border pb-4 last:border-0"
                  >
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted"
                    >
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium leading-tight text-foreground hover:text-accent"
                      >
                        {item.product.name}
                      </Link>
                      <span className="mt-0.5 text-sm text-muted-foreground">
                        {formatPrice(item.product.price)}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-border px-6 py-5">
              {subtotal < 150 && (
                <div className="mb-4 rounded-lg bg-muted px-4 py-3 text-center text-sm text-muted-foreground">
                  Add{' '}
                  <span className="font-semibold text-foreground">
                    {formatPrice(150 - subtotal)}
                  </span>{' '}
                  more for free shipping
                </div>
              )}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between border-t border-border pt-3">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              <Button className="mt-4 w-full rounded-full" size="lg">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={closeCart}
                className="mt-3 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
