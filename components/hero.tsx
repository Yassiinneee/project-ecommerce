'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/11911863/pexels-photo-11911863.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[680px] lg:px-8">
        <div className="max-w-xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>New Autumn Collection</span>
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Goods designed for the way you live.
          </h1>
          <p className="mt-6 max-w-md text-lg text-background/70">
            Thoughtfully crafted products that blend timeless design with
            modern functionality. Curated for everyday excellence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/shop">
                Shop the Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link href="/#featured">Explore Featured</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="relative border-t border-background/10 bg-foreground/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-background/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.8★', label: 'Average Rating' },
            { value: '120+', label: 'Curated Products' },
            { value: 'Free', label: 'Shipping over $150' },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-bold text-background">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-background/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
