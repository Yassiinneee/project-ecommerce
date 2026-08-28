import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "The quality exceeded every expectation. My Nomad backpack has been to 12 countries with me and still looks incredible.",
    author: 'Sofia M.',
    role: 'Verified Customer',
    rating: 5,
  },
  {
    quote:
      "I've tried every major headphone brand. The Aura is in a league of its own — the sound is just breathtaking.",
    author: 'Marcus T.',
    role: 'Verified Customer',
    rating: 5,
  },
  {
    quote:
      "Beautiful design, fast shipping, and the customer support team actually helped me pick the right size. 10/10.",
    author: 'Elena R.',
    role: 'Verified Customer',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="about" className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            Loved by thousands
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What our customers say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-background p-8 shadow-sm"
            >
              <Quote className="h-8 w-8 text-accent/30" />
              <p className="mt-4 text-foreground/80">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
