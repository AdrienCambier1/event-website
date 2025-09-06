"use client";
import { useState } from "react";
import CustomTitle from "@/components/titles/custom-title";
import ReviewCard from "@/components/cards/review-card/review-card";
import { SendDiagonal } from "iconoir-react";
import ReviewCardSkeleton from "../cards/review-card/review-card-skeleton";
import RatingStar from "../commons/rating-stars";
import ReviewInput from "../inputs/review-input";
import { useCreateReview } from "@/hooks/use-review";
import { useAuth } from "@/hooks/use-auth";

export default function ReviewList({
  title,
  description,
  showText,
  showForm,
  isLoading,
  reviews,
  reviewedUserId,
  refetch,
}) {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [successReview, setSuccessReview] = useState(false);

  const { user, token } = useAuth();
  const { postReview, loading: postingReview } = useCreateReview(token);

  const handleReviewSubmit = async () => {
    if (
      !reviewText.trim() ||
      reviewRating === 0 ||
      !user?.id ||
      !reviewedUserId ||
      postingReview
    ) {
      return;
    }

    setSuccessReview(false);

    const reviewData = {
      rating: reviewRating,
      content: reviewText.trim(),
      senderUserId: user.id,
      reviewedUserId: parseInt(reviewedUserId),
    };

    try {
      await postReview(reviewData);

      setReviewText("");
      setReviewRating(0);
      setSuccessReview(true);

      if (refetch) {
        await refetch();
      }
    } catch (error) {
      console.error("Erreur lors de la publication:", error);
      setSuccessReview(false);
    }
  };

  const isSubmitDisabled =
    !reviewText.trim() || reviewRating === 0 || postingReview || !user?.id;

  const filteredReviews = reviews?.filter(
    (review) => review.reviewedUserId === parseInt(reviewedUserId)
  );

  return (
    <section className="page-grid">
      <div className="z-10">
        <div className="flex flex-col gap-6 sticky top-20">
          <CustomTitle title={title} description={description} />
          <div className="flex flex-col gap-4">
            {showText && (
              <p>
                Consultez les différents avis laissés par les participants de
                vos événements.
              </p>
            )}
            {showForm && (
              <>
                <ReviewInput
                  review={reviewText}
                  rating={reviewRating}
                  onReviewChange={setReviewText}
                  onRatingChange={setReviewRating}
                />
                <button
                  className="primary-btn"
                  onClick={handleReviewSubmit}
                  disabled={isSubmitDisabled}
                >
                  <span>
                    {postingReview ? "Publication..." : "Publier votre avis"}
                  </span>
                  <SendDiagonal />
                </button>
                {successReview && (
                  <p className="green-text">Avis publié avec succès !</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="cards-grid !grid-cols-1 ">
        {isLoading && (
          <>
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </>
        )}
        {!isLoading && filteredReviews?.length === 0 && (
          <p>Aucun avis pour le moment</p>
        )}
        {!isLoading &&
          filteredReviews?.map((review, index) => (
            <ReviewCard
              key={index}
              name="Adrien Cambier"
              note={review.rating}
              date={review.createdAt}
              review={review.content}
              canEdit={review.senderUserId === user?.id}
              reviewData={review}
              onRefresh={refetch}
            />
          ))}
      </div>
    </section>
  );
}
