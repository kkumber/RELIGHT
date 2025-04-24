import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProp {
  selectedRating: number;
  handleStarRating: (index: number) => void;
}

const StarRating = ({ selectedRating, handleStarRating }: StarRatingProp) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex space-x-1 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform transform hover:scale-110 duration-200 ease-out"
          >
            <FaStar
              className={`w-8 h-8 ${
                (hoverRating || selectedRating) >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {selectedRating
          ? `You rated this ${selectedRating} out of 5`
          : "Click to rate"}
      </p>
    </div>
  );
};

export default StarRating;
