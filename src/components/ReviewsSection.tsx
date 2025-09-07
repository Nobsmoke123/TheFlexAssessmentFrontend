import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import type { Review } from "@/lib/api";
import { format } from "date-fns";

interface ReviewsSectionProps {
  reviews?: Review[];
  isLoading?: boolean;
}

export const ReviewsSection = ({ reviews, isLoading }: ReviewsSectionProps) => {
  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Guest Reviews
        </h2>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Guest Reviews
        </h2>
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No guest reviews available yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Guest Reviews</h2>
        <div className="flex items-center gap-3">
          <StarRating rating={averageRating} size="md" />
          <span className="text-sm text-muted-foreground">
            ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {review.authorName || "Anonymous Guest"}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating
                          rating={review.rating}
                          size="sm"
                          showValue={false}
                        />
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(review.createdAt), "MMMM yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {review.channel.displayName}
                      </Badge>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="text-foreground leading-relaxed">
                    <p>{review.content}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        Stayed{" "}
                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
