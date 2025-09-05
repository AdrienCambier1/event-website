import CustomTitle from "@/components/titles/custom-title";
import ReviewCard from "@/components/cards/review-card/review-card";
import { SendDiagonal } from "iconoir-react";
import ReviewCardSkeleton from "../cards/review-card/review-card-skeleton";

export default function ReviewList({
  title,
  description,
  showText,
  showForm,
  isLoading,
  reviews,
  organizerId,
}) {
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
                <input type="text" placeholder="Votre avis" />
                <button className="primary-btn">
                  <span>Publier votre avis</span> <SendDiagonal />
                </button>
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
        {!isLoading && reviews?.length === 0 && (
          <p>Aucun avis pour le moment</p>
        )}
        {!isLoading &&
          reviews?.map((review) => (
            <ReviewCard
              key={review.id}
              name="Adrien Cambier"
              note={review.rating}
              date={review.createdAt}
              review={review.content}
            />
          ))}
      </div>
    </section>
  );
}
