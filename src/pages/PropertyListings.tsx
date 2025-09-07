import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProperties } from "@/hooks/useProperties";
import { MapPin, Star, Wifi, Car, Coffee, Dumbbell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const PropertyListings = () => {
  const navigate = useNavigate();
  const { data: properties, isLoading, error } = useProperties();

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-destructive mb-2">
            Error Loading Properties
          </h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Properties
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Find your perfect home away from home with our curated selection
              of premium properties
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              Manager Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Available Properties</h2>
          <p className="text-muted-foreground">
            Browse our collection of {properties?.length || 0} premium
            properties
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(`/property/${property.id}/details`)}
              >
                <div className="relative h-48 bg-muted">
                  <img
                    src={
                      property.images[0].url || "https://placehold.co/600x400"
                    }
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90">
                      ${property.price}/night
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address.length > 50
                      ? `${property.address.substring(0, 50)}...`
                      : property.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({property.reviews.length} review
                      {property.reviews.length > 1 ? "s" : ""})
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4" />
                      <span className="text-xs">WiFi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      <span className="text-xs">Parking</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="h-4 w-4" />
                      <span className="text-xs">Kitchen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Dumbbell className="h-4 w-4" />
                      <span className="text-xs">Gym</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/property/${property.id}/details`);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">
                No Properties Available
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new property listings.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
