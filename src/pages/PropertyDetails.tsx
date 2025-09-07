import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProperty } from "@/hooks/useProperties";
import { usePropertyReviews } from "@/hooks/useReviews";
import {
  ArrowLeft,
  Users,
  Bed,
  Bath,
  Home,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  Shield,
  Calendar,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ReviewsSection } from "@/components/ReviewsSection";

export const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: property, isLoading: propertyLoading } = useProperty(id!);

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

  const amenities = [
    { icon: Wifi, label: "Internet" },
    { icon: Car, label: "Wireless" },
    { icon: Coffee, label: "Kitchen" },
    { icon: Dumbbell, label: "Washing Machine" },
    { icon: Waves, label: "Hair Dryer" },
    { icon: Shield, label: "Heating" },
    { icon: Calendar, label: "Smoke Detector" },
    { icon: Clock, label: "Carbon Monoxide Detector" },
    { icon: MessageSquare, label: "Essentials" },
  ];

  if (propertyLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-6xl space-y-6">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">English</span>
              <span className="text-sm text-muted-foreground">GBP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <AspectRatio ratio={16 / 10}>
              <img
                src={property.images[selectedImageIndex].url}
                alt="Property main view"
                className="w-full h-full object-cover rounded-lg"
              />
            </AspectRatio>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <AspectRatio key={index} ratio={1}>
                <img
                  src={image.url}
                  alt={`Property view ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImageIndex(index + 1)}
                />
              </AspectRatio>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Details */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {property?.name || "Elegant 2 Bed Flat near Camden Market"}
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} bathroom</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>{property.beds} beds</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                About this property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
              {/* <button className="text-primary hover:underline mt-2">
                Read more
              </button> */}
            </div>

            {/* Amenities */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Amenities
                </h2>
                {/* <button className="text-primary hover:underline text-sm">
                  View all amenities
                </button> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3">
                    <amenity.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Policies */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Stay Policies
              </h2>

              <div className="space-y-6">
                {/* Check-in & Check-out */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Check-in & Check-out</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Check-in time
                        </div>
                        <div className="font-medium">3:00 PM</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Check-out time
                        </div>
                        <div className="font-medium">10:00 AM</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* House Rules */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">House Rules</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>No smoking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>No pets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>No parties or events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span>Security deposit required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cancellation Policy */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Cancellation Policy</span>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="font-medium mb-2">
                          For stays less than 28 days
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>
                            • Full refund up to 14 days before checking in
                          </li>
                          <li>
                            • 50% refund for anything less than 14 days before
                            check-in
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium mb-2">
                          For stays of 28 days or more
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>
                            • Full refund up to 30 days before checking in
                          </li>
                          <li>
                            • 50% refund for anything less than 30 days before
                            check-in
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Location
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Interactive map would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Guest Reviews Section */}
            <ReviewsSection reviews={[...property.reviews]} isLoading={false} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-4">
                    Book your stay
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Select dates to see the total price
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Send dates
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Check availability
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-emerald-600 border-emerald-600"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Send enquiry
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    <Shield className="h-3 w-3 inline mr-1" />
                    Instant cash protection
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
