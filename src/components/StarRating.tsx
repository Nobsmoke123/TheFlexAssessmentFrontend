import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showValue = true 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const partial = index === Math.floor(rating) && rating % 1 !== 0;
          
          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                filled || partial ? 'fill-warning text-warning' : 'text-muted-foreground'
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={cn('font-medium text-foreground', textSize[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};