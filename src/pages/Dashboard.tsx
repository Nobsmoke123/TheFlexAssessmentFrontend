import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { usePropertiesAdmin } from "@/hooks/useProperties";
import { Building2, Star, TrendingUp, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data: properties, isLoading, error } = usePropertiesAdmin();

  // Calculate dashboard stats
  const stats =
    properties && Array.isArray(properties) && properties.length > 0
      ? properties.reduce(
          (acc, property) => ({
            totalProperties: acc.totalProperties + 1,
            totalReviews: acc.totalReviews + (property.reviews.length ?? 0),
            avgRating:
              acc.avgRating + property.reviews.length > 0
                ? property.reviews.reduce((acc, value) => {
                    if (value.status === "published") {
                      return acc + value.rating;
                    } else {
                      return acc + 0;
                    }
                  }, 0)
                : 0,
            pendingReviews:
              acc.pendingReviews +
              property.reviews.reduce((acc, value) => {
                if (value.status === "pending") {
                  return acc + 1;
                } else {
                  return acc + 0;
                }
              }, 0),
          }),
          {
            totalProperties: 0,
            totalReviews: 0,
            avgRating: 0,
            pendingReviews: 0,
          }
        )
      : null;

  const avgRating = stats ? stats.avgRating / stats.totalProperties : 0;

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-destructive mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-muted-foreground">
            Please check your backend connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Reviews Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage property reviews across all channels
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Properties
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">
                  {stats?.totalProperties || 0}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reviews
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">
                  {stats?.totalReviews || 0}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-warning">
                  {stats?.pendingReviews || 0}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Properties</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => navigate(`/property/${property.id}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Properties Found
                </h3>
                <p className="text-muted-foreground">
                  Start by adding properties to your portfolio to see them here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
