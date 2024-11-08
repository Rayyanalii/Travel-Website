import React, { useState } from 'react';
import Stars from '../General/Stars';

const RatingStars = ({ setRating }) => {
    const [count, setCount] = useState(0); 

    const handleStarClick = (rating) => {
        setCount(rating);
        setRating(rating);
    };

    return (
        <div className="ratingStarContainer">
            <Stars num={count} onStarClick={handleStarClick} isClickable={true}/>
        </div>
    );
};

export default RatingStars;
