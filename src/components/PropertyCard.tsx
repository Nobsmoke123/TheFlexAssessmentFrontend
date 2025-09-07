import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { Property } from "@/lib/api";
import { Building2, TrendingUp } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const approvalRate =
    property.reviews.length > 0
      ? (property.reviews.reduce((acc, value) => {
          if (value.status === "published") {
            return acc + 1;
          } else {
            return acc + 0;
          }
        }, 0) /
          property.reviews.length) *
        100
      : 0;

  const approvedReviews =
    property.reviews.length > 0
      ? property.reviews.reduce((acc, value) => {
          if (value.status === "published") {
            return acc + 1;
          } else {
            return acc + 0;
          }
        }, 0)
      : 0;

  const pendingReviews =
    property.reviews.length > 0
      ? property.reviews.reduce((acc, value) => {
          if (value.status === "pending") {
            return acc + 1;
          } else {
            return acc + 0;
          }
        }, 0)
      : 0;

  const averageRating =
    property.reviews.length > 0
      ? property.reviews.reduce((acc, value) => {
          if (value.status === "published") {
            return acc + value.rating;
          } else {
            return acc + 0;
          }
        }, 0) / property.reviews.length
      : 0;

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20 group"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {property.name}
              </h3>
              {property.address && (
                <p className="text-sm text-muted-foreground">
                  {property.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating Section */}
        <div className="flex items-center justify-between">
          <StarRating rating={averageRating} size="md" />
          <Badge variant="secondary" className="text-xs">
            {property.reviews.length} reviews
          </Badge>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {approvedReviews}
            </div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {pendingReviews}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Approval Rate */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Approval Rate</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="font-medium text-success">
                {approvalRate.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
