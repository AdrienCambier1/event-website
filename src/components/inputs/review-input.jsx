import RatingStar from "../commons/rating-stars";

export default function ReviewInput({
  onReviewChange = () => {},
  onRatingChange = () => {},
  review = "",
  rating = 0,
}) {
  const handleReviewChange = (e) => {
    const newReview = e.target.value;
    onReviewChange(newReview);
  };

  const handleRatingChange = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div className="review-input group">
      <textarea
        placeholder="Votre avis"
        value={review}
        onChange={handleReviewChange}
      />
      <RatingStar
        note={rating}
        selectable={true}
        onRatingChange={handleRatingChange}
        className="p-3 pt-0"
      />
    </div>
  );
}
