import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { StarRating } from "./StarRating";
import { Review } from "@/lib/api";
import { useApproveReview } from "@/hooks/useReviews";
import { format } from "date-fns";

interface ReviewsTableProps {
  reviews: Review[];
}

export const ReviewsTable = ({ reviews }: ReviewsTableProps) => {
  const approveReviewMutation = useApproveReview();

  const handleApprovalToggle = (reviewId: string, currentStatus: string) => {
    const newApproved = currentStatus !== "approved";
    approveReviewMutation.mutate({ reviewId, approved: newApproved });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "default",
      pending: "secondary",
      rejected: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (reviews && reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews found matching your criteria.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews &&
            reviews.map((review, index) => (
              <TableRow key={review.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <StarRating
                    rating={review.rating}
                    size="sm"
                    showValue={false}
                  />
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="space-y-1">
                    <p className="text-sm line-clamp-2">{review.content}</p>
                    {review.authorName && (
                      <p className="text-xs text-muted-foreground">
                        by {review.authorName}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {review.channel.displayName}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(review.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell>
                  <Switch
                    checked={review.status === "published"}
                    onCheckedChange={() =>
                      handleApprovalToggle(review.id, review.status)
                    }
                    disabled={approveReviewMutation.isPending}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
