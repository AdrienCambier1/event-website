"use client";
import ReviewList from "@/components/lists/review-list";
import { useParams } from "next/navigation";
import { useReviews } from "@/hooks/use-review";

export default function AvisPage() {
  const { id } = useParams();

  const { reviews, loading: reviewsLoading, refetch } = useReviews(0, 50);

  return (
    <ReviewList
      title="Avis des participants"
      description="Avis"
      showForm={true}
      reviews={reviews}
      isLoading={reviewsLoading}
      reviewedUserId={id}
      refetch={refetch}
    />
  );
}
