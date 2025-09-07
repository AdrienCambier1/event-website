"use client";
import { Star } from "iconoir-react";
import { StarSolid } from "iconoir-react";
import { useState, useEffect } from "react";

export default function RatingStar({
  note = 0,
  selectable = false,
  onRatingChange = () => {},
  className = "",
}) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    setHoveredRating(0);
  }, [note]);

  const handleStarClick = (rating) => {
    if (!selectable) return;
    onRatingChange(rating);
  };

  const handleStarHover = (rating) => {
    if (!selectable) return;
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    if (!selectable) return;
    setHoveredRating(0);
  };

  const displayRating = selectable ? hoveredRating || note : note;

  return (
    <div
      className={`flex items-center ${selectable && "gap-1"} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {stars.map((star) => {
        const StarComponent = star <= displayRating ? StarSolid : Star;
        return (
          <StarComponent
            key={star}
            className={`${
              selectable ? "h-5 w-5 cursor-pointer" : "h-3 w-3"
            } text-[var(--primary-blue)] transition`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
          />
        );
      })}
    </div>
  );
}
