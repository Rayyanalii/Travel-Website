import React, { useEffect, useState } from 'react';
import Stars from '../General/Stars';

const RatingStars = ({ setRating, defaultvalue }) => {
    const [count, setCount] = useState(0);

    const handleStarClick = (rating) => {
        setCount(rating);
        setRating(rating);
    };


    useEffect(() => {
        if (defaultvalue == 0) {
            setCount(0);
        }

    }, [defaultvalue])


    return (
        <div className="ratingStarContainer">
            <Stars num={count} onStarClick={handleStarClick} isClickable={true} />
        </div>
    );
};

export default RatingStars;
