import React, { useState } from 'react';

const StarRating = ({ rating, onStarClick }) => {
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  return (
    <div className="star-container">
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => onStarClick(currentRating)}
              style={{ display: 'none' }}
            />
            <span
              className="star"
              style={{
                color: currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
