import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReviewsTable } from "@/components/ReviewsTable";
import { ReviewFilters } from "@/components/ReviewFilters";
import { StarRating } from "@/components/StarRating";
import { useProperty } from "@/hooks/useProperties";
import { useChannels, usePropertyReviews } from "@/hooks/useReviews";
import { ArrowLeft, Building2, Star, TrendingUp, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReviewFilters as IReviewFilters } from "@/lib/api";

export const PropertyReviews = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<IReviewFilters>({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: property, isLoading: propertyLoading } = useProperty(id!);
  const { data: reviews, isLoading: reviewsLoading } = usePropertyReviews(
    id!,
    filters
  );

  const { data: channels, isLoading: channelsLoading } = useChannels();

  if (!id) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-destructive">
            Property Not Found
          </h2>
        </div>
      </div>
    );
  }

  const approvedReviews =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, value) => {
          if (value.status === "published") {
            return acc + 1;
          } else {
            return acc + 0;
          }
        }, 0)
      : 0;

  console.log("The number of approved reviews is:");
  console.log(approvedReviews);

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, value) => {
          if (value.status === "published") {
            return acc + value.rating;
          } else {
            return acc + 0;
          }
        }, 0) / reviews.length
      : 0;

  const pendingReviews =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, value) => {
          if (value.status === "pending") {
            return acc + 1;
          } else {
            return acc + 0;
          }
        }, 0)
      : 0;

  const approvalRate =
    reviews && reviews.length > 0
      ? (reviews.reduce((acc, value) => {
          if (value.status === "published") {
            return acc + 1;
          } else {
            return acc + 0;
          }
        }, 0) /
          reviews.length) *
        100
      : 0;

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Property Info */}
        {reviewsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        ) : property ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    {property.name}
                  </CardTitle>
                  {property.address && (
                    <p className="text-muted-foreground mt-1">
                      {property.address}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="text-sm">
                  Property ID: {property.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Average Rating</span>
                  </div>
                  <StarRating rating={averageRating} size="lg" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Total Reviews</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {property.reviews.length}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="text-2xl font-bold text-warning">
                    {pendingReviews}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">Approval Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-success">
                    {approvalRate.toFixed(0)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Filters */}
        <ReviewFilters
          filters={filters}
          channels={channels}
          onFiltersChange={setFilters}
        />

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews ? (
              <ReviewsTable reviews={reviews && reviews} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No reviews found for this property.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
