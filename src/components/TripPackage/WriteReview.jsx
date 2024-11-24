import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import RedButton from '../RedButton';
import { useAuth } from '../../pages/Auth/AuthContext';


const WriteReview = ({ id, name }) => {
    const { loggedIn } = useAuth();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("comments", comment);
        formData.append("username", localStorage.getItem('username'));
        formData.append("userID", localStorage.getItem('userID'));
        formData.append("accommodationRating", accommodationRating);
        formData.append("destinationRating", destinationRating);
        formData.append("valueForMoneyRating", valueForMoneyRating);
        formData.append("transportRating", transportRating);
        formData.append("mealsRating", mealsRating);
        formData.append("overallRating", overallRating);
        formData.append("tripPackageID", id);
        formData.append("tripPackageName", name);


        try {
            // Send data using fetch
            const response = await fetch("http://localhost:3000/api/add-review", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Failed to submit review.");
            } else {
                const result = await response.json();
                setSuccess(true);
                setError("");
                setComment("");
                setAccommodationRating(0);
                setDestinationRating(0);
                setValueForMoneyRating(0);
                setTransportRating(0);
                setMealsRating(0);
                setOverallRating(0);

                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            }
        } catch (error) {
            // Handle fetch error
            setError("Something went wrong, please try again later.");
        }
    };

    return (
        <>

            <div className="writeReviewContainer">
                <div className="writeReviewTitleAndView">
                    <h3>Write a Review</h3>
                    <Link to={"/reviews"}>View all reviews here</Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                        {!loggedIn && <div className="reviewNotLoggedInContainer">
                            <div className="notLoggedInText">
                                <h3>Please login inorder to write a review</h3>
                            </div>
                        </div>}

                        <div className="writeReviewInputContainer">
                            <label htmlFor="comment">Comment</label>
                            <textarea rows="6" type="text" id="comment" value={comment} onChange={changeComment} required placeholder='Write your comments here' />
                        </div>
                        <div className="tripRatingsItemsContainer">
                            <div className="tripRatingRow">
                                <div className="tripRatingItem">
                                    <h4>Accommodation</h4>
                                    <RatingStars setRating={setAccommodationRating} defaultvalue={accommodationRating} />
                                </div>
                                <div className="tripRatingItem">
                                    <h4>Destination</h4>
                                    <RatingStars setRating={setDestinationRating} defaultvalue={destinationRating} />
                                </div>
                            </div>
                            <div className="tripRatingRow">
                                <div className="tripRatingItem">
                                    <h4>Value for money</h4>
                                    <RatingStars setRating={setValueForMoneyRating} defaultvalue={valueForMoneyRating} />
                                </div>
                                <div className="tripRatingItem">
                                    <h4>Transport</h4>
                                    <RatingStars setRating={setTransportRating} defaultvalue={transportRating} />
                                </div>
                            </div>
                            <div className="tripRatingRow">
                                <div className="tripRatingItem">
                                    <h4>Meals</h4>
                                    <RatingStars setRating={setMealsRating} defaultvalue={mealsRating} />
                                </div>
                                <div className="tripRatingItem">
                                    <h4>Overall</h4>
                                    <RatingStars setRating={setOverallRating} defaultvalue={overallRating} />
                                </div>
                            </div>
                        </div>
                        {!success && <button type="submit" className='reviewSubmitButton'>Post Review</button>
                        }
                        {success && <button type="submit" className='reviewSubmitSuccessful' disabled>Posted Successfully</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default WriteReview;
