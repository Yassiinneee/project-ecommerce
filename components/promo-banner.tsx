import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-foreground text-background">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/34883578/pexels-photo-34883578.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-accent">
              Limited Time
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Autumn Sale — up to 30% off
            </h2>
            <p className="mt-4 max-w-md text-background/70">
              Refresh your everyday essentials with our seasonal markdowns.
              Selected styles, while supplies last.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/shop">
                Shop the Sale
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
