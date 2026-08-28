import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
  className?: string;
};

export function StarRating({
  rating,
  size = 'sm',
  showValue = false,
  count,
  className,
}: StarRatingProps) {
  const sizeClass = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size];

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <Star
              key={star}
              className={cn(
                sizeClass,
                filled
                  ? 'fill-accent text-accent'
                  : half
                    ? 'fill-accent/50 text-accent'
                    : 'fill-muted text-muted-foreground/40'
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({count} review{count !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
}
