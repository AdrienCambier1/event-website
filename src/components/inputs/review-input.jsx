import RatingStar from "../commons/rating-stars";

export default function ReviewInput({
  onReviewChange = () => {},
  onRatingChange = () => {},
  review = "",
  rating = 0,
}) {
  return (
    <div className="review-input group">
      <textarea
        placeholder="Votre avis"
        value={review}
        onChange={onReviewChange}
      />
      <RatingStar
        note={rating}
        selectable={true}
        onRatingChange={onRatingChange}
        className="p-3 pt-0"
      />
    </div>
  );
}
