import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import RedButton from '../RedButton';

const WriteReview = () => {
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [accommodationRating, setAccommodationRating] = useState(0);
    const [destinationRating, setDestinationRating] = useState(0);
    const [valueForMoneyRating, setValueForMoneyRating] = useState(0);
    const [transportRating, setTransportRating] = useState(0);
    const [mealsRating, setMealsRating] = useState(0);
    const [overallRating, setOverallRating] = useState(0);

    const changeComment = (e) => setComment(e.target.value);
    const changeUsername = (e) => setUsername(e.target.value);
    const changeEmail = (e) => setEmail(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <div className="writeReviewContainer">
                <div className="writeReviewTitleAndView">
                    <h3>Write a Review</h3>
                    <Link to={"/reviews"}>View all reviews here</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                        <div className="writeReviewInputContainer">
                            <label htmlFor="comment">Comment</label>
                            <textarea rows="6" type="text" id="comment" value={comment} onChange={changeComment} required />
                        </div>
                        <div className="twoInputFlexbox">
                            <div className="writeReviewInputTextContainer">
                                <label htmlFor="username">Name</label>
                                <input type="text" id="username" value={username} onChange={changeUsername} required />
                            </div>
                            <div className="writeReviewInputTextContainer">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={changeEmail} required />
                            </div>
                        </div>
                        <div className="tripRatingsItemsContainer">
                            <div className="tripRatingRow">
                                <div className="tripRatingItem">
                                    <h4>Accommodation</h4>
                                    <RatingStars setRating={setAccommodationRating} />
                                </div>
                                <div className="tripRatingItem">
                                    <h4>Destination</h4>
                                    <RatingStars setRating={setDestinationRating} />
                                </div>
                            </div>
                            <div className="tripRatingRow">
                                <div className="tripRatingItem">
                                    <h4>Value for money</h4>
                                    <RatingStars setRating={setValueForMoneyRating} />
                                </div>
                                <div className="tripRatingItem">
                                    <h4>Transport</h4>
                                    <RatingStars setRating={setTransportRating} />
                                </div>
                            </div>
                            <div className="tripRatingRow">
                                <div className="tripRatingItem">
                                    <h4>Meals</h4>
                                    <RatingStars setRating={setMealsRating} />
                                </div>
                                <div className="tripRatingItem">
                                    <h4>Overall</h4>
                                    <RatingStars setRating={setOverallRating} />
                                </div>
                            </div>
                        </div>
                    <RedButton type="submit" review={true} desc="Post Review"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default WriteReview;
