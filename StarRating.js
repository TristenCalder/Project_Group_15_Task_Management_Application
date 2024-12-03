import React from 'react';
import './starrating.css';

const StarRating = ({ rating, onRatingChange }) => {
    const handleStarClick = (value) => {
        onRatingChange(value);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(value => (
                <span
                    key={value}
                    className={`star ${value <= rating ? 'active' : ''}`}
                    onClick={() => handleStarClick(value)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;