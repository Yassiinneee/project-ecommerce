'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { StarRating } from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase-client';
import type { Review } from '@/lib/types';
import { cn } from '@/lib/utils';

type ReviewsSectionProps = {
  productId: string;
  initialReviews: Review[];
  rating: number;
  reviewCount: number;
};

export function ReviewsSection({
  productId,
  initialReviews,
  rating,
  reviewCount,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          author_name: name,
          rating: formRating,
          comment,
        })
        .select('*')
        .single();

      if (insertError) throw insertError;
      if (data) {
        setReviews((prev) => [data as Review, ...prev]);
        setName('');
        setComment('');
        setFormRating(5);
        setShowForm(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-t border-border py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Customer Reviews
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={rating} size="md" showValue />
            <span className="text-sm text-muted-foreground">
              Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-full"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 animate-fade-in rounded-2xl border border-border bg-muted/30 p-6"
        >
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="mt-1.5 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-1"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={cn(
                        'h-6 w-6 transition-colors',
                        star <= formRating
                          ? 'fill-accent text-accent'
                          : 'fill-muted text-muted-foreground/40'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="mt-1.5"
              rows={4}
              placeholder="Share your thoughts about this product..."
            />
          </div>
          {error && (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-full"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          No reviews yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-border pb-6 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {review.author_name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {review.author_name}
                  </p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-foreground/80">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
