import { Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $150, delivered in 2-5 business days.',
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    description: 'Not in love? Return it for a full refund, no questions asked.',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    description: 'Every product is backed by our quality guarantee.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Real humans, ready to help 7 days a week.',
  },
];

export function FeatureBanner() {
  return (
    <section className="border-y border-border bg-muted/50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4 px-6 py-8"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background text-accent shadow-sm">
              <feature.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
