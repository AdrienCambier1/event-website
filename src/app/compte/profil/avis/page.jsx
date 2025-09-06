"use client";
import ReviewList from "@/components/lists/review-list";
import { useReviews } from "@/hooks/use-review";
import { useAuth } from "@/hooks/use-auth";

export default function AvisPage() {
  const { user } = useAuth();
  const { reviews, loading: reviewsLoading, refetch } = useReviews(0, 50);

  return (
    <ReviewList
      title="Avis de mes participants"
      description="Avis"
      showText={true}
      reviews={reviews}
      isLoading={reviewsLoading}
      reviewedUserId={user?.id}
      refetch={refetch}
    />
  );
}
