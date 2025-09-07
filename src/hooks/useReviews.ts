import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  channelsApi,
  propertyApi,
  reviewApi,
  type ReviewFilters,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { getReviewsForProperty } from "@/lib/mockData";

export const usePropertyReviews = (
  propertyId: string,
  filters?: ReviewFilters
) => {
  return useQuery({
    queryKey: ["property-reviews", propertyId, filters],
    queryFn: async () => {
      try {
        const response = await propertyApi.getReviews(propertyId, filters);
        return response.data.reviews;
      } catch (error) {
        // Fallback to mock data if backend is not available
        console.warn("Backend not available, using mock data");
        let reviews = getReviewsForProperty(propertyId);

        // // Apply basic filtering for demo
        if (filters?.status) {
          reviews = reviews.filter((r) => r.status === filters.status);
        }
        if (filters?.ratingMin) {
          reviews = reviews.filter((r) => r.rating >= filters.ratingMin!);
        }

        return reviews;
      }
    },
    enabled: !!propertyId,
  });
};

export const useChannels = () => {
  return useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      try {
        const response = await channelsApi.findAll();
        return response.data;
      } catch (error) {
        console.warn("Backend not available, using mock data");
        console.log(error);
      }
    },
  });
};

export const useApproveReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: string; approved: boolean }) =>
      reviewApi.approve(reviewId),
    onSuccess: (_, { approved }) => {
      toast({
        title: approved ? "Review approved" : "Review unapproved",
        description: `The review has been ${
          approved ? "approved" : "unapproved"
        } successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["property-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update review status.",
        variant: "destructive",
      });
    },
  });
};
