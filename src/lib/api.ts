import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface Review {
  authorAvatarUrl?: string;
  authorName: string;
  channel: {
    id: number;
    name: string;
    displayName: string;
  };
  content: string;
  createdAt: string;
  id: string;
  propertyId: string;
  rating: number;
  ratingOriginal?: number;
  source: string;
  sourceReviewId: string;
  status: string;
  type: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  googlePlaceId?: string;
  name: string;
  listingId: string;
  externalListingName: string;
  internalListingName: string;
  description: string;
  address: string;
  city: string;
  country: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  guests: string;
  bedrooms: string;
  bathrooms: string;
  beds: string;
  checkInTime: string;
  checkOutTime: string;
  price: string;
  images: Array<{
    url: string;
    sortOrder: number;
  }>;
  amenities: string;
  houseRules: string;
  cancellationPolicies: string;
  reviews: Array<Review>;
  createdAt: string;
  updatedAt: string;
}

export interface IChannels {
  id: number;
  name: string;
  displayName: string;
}

export interface ReviewFilters {
  channelId?: string;
  ratingMin?: number;
  status?: "pending" | "published" | "rejected";
  startDate?: string;
  reviewType?: "guest-to-host" | "host-to-guest";
  endDate?: string;
  sortBy?: "rating" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// API Functions
export const propertyApi = {
  getAll: () => api.get<{ properties: Property[] }>("/properties"),
  getById: (id: string) => api.get<Property>(`/properties/${id}`),
  getByIdAdmin: (id: string, query: ReviewFilters) =>
    api.get<Property>(`/properties/${id}`, {
      params: query,
    }),
  getAllAdmin: () => api.get<{ properties: Property[] }>("/properties/admin"),
  getReviews: (id: string, filters?: ReviewFilters) => {
    const params = new URLSearchParams();
    if (filters?.channelId) params.append("channelId", filters.channelId);
    if (filters?.ratingMin)
      params.append("ratingMin", filters.ratingMin.toString());

    if (filters?.status) params.append("status", filters.status);
    if (filters?.startDate) params.append("from", filters.startDate);
    if (filters?.endDate) params.append("to", filters.endDate);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
    if (
      filters?.reviewType &&
      (filters.reviewType === "guest-to-host" ||
        filters.reviewType === "host-to-guest")
    )
      params.append("reviewType", filters.reviewType);
    params.append("propertyId", id);

    return api.get<{ reviews: Review[] }>(`/reviews?${params.toString()}`);
  },
};

export const reviewApi = {
  approve: (id: string) => api.patch(`/reviews/${id}/approve`),

  reject: (id: string) => api.patch(`/reviews/${id}/reject`),
};

export const channelsApi = {
  findAll: () => api.get("/channels"),
};
