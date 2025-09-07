// Mock data for testing the dashboard before backend integration
import type { Review } from "./api";

export const mockReviews: Review[] = [
  {
    id: "1",
    propertyId: "1",
    type: "guest-to-host",
    source: "HOSTAWAY",
    sourceReviewId: "12323122",
    rating: 5,
    content:
      "Absolutely stunning property with incredible ocean views. The host was responsive and the place was spotless. Would definitely book again!",
    channel: {
      id: 2018,
      name: "Airbnb",
      displayName: "Airbnb",
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    status: "approved",
    authorName: "Sarah Johnson",
  },
  {
    id: "2",
    propertyId: "1",
    type: "guest-to-host",
    source: "HOSTAWAY",
    sourceReviewId: "12323122",
    rating: 4,
    content:
      "Great location and beautiful property. The only minor issue was that the WiFi was a bit slow, but overall an excellent stay.",
    channel: {
      id: 2005,
      name: "Booking.com",
      displayName: "Booking.com",
    },
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
    status: "pending",
    authorName: "Michael Chen",
  },
  {
    id: "3",
    propertyId: "1",
    type: "guest-to-host",
    source: "HOSTAWAY",
    sourceReviewId: "12323122",
    rating: 5,
    content:
      "Perfect vacation rental! Everything was exactly as described. The amenities were top-notch and the location couldn't be better.",

    channel: {
      id: 2022,
      name: "Google",
      displayName: "Google",
    },
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    status: "approved",
    authorName: "Emily Rodriguez",
  },
  {
    id: "4",
    propertyId: "1",
    type: "guest-to-host",
    source: "HOSTAWAY",
    sourceReviewId: "12323122",
    rating: 3,
    content:
      "The property was nice but had some maintenance issues. The air conditioning wasn't working properly during our stay.",
    channel: {
      id: 2022,
      name: "Google",
      displayName: "Google",
    },
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
    status: "pending",
    authorName: "David Kim",
  },
  {
    id: "5",
    propertyId: "1",
    type: "guest-to-host",
    source: "HOSTAWAY",
    sourceReviewId: "123232",
    rating: 5,
    content:
      "Fantastic stay! The property exceeded our expectations. Beautiful decor, comfortable beds, and an amazing view.",
    channel: {
      id: 2123,
      name: "Direct",
      displayName: "Direct",
    },
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    status: "approved",
    authorName: "Lisa Thompson",
  },
];

// Helper function to get reviews for a specific property
export const getReviewsForProperty = (propertyId: string): Review[] => {
  return mockReviews.filter((review) => review.propertyId === propertyId);
};
