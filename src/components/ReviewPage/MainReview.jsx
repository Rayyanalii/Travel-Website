import React from 'react'
import Stars from '../General/Stars';

const MainReview = ({ review }) => {
    return (
        <>
            <div className="main-review-container">
                <div className="gray-divider"></div>
                <div className="username-and-trip-flexbox">
                    <div className="username-and-profile">
                        <img src="/Uploads/userProfileLogo.png" alt="" />
                        <p>{review.USERNAME}</p>
                    </div>
                    <p id='tripNameReview'>on {review.PACKAGENAME}</p>
                </div>
                <div className="review-comment">
                    <p>{review.COMMENTS}</p>
                </div>
                <div className="review-stars">
                    <div className="tripRatingRow">
                        <div className="tripRatingItem">
                            <h4>Accomodation</h4>
                            <div className="ratingStarContainer">
                                <Stars num={review.ACCOMMODATIONSTARS} isClickable={false} />
                            </div>
                        </div>
                        <div className="tripRatingItem">
                            <h4>Destination</h4>
                            <div className="ratingStarContainer">
                                <Stars num={review.DESTINATIONSTARS} isClickable={false} />
                            </div>
                        </div>
                    </div>
                    <div className="tripRatingRow">
                        <div className="tripRatingItem">
                            <h4>Value</h4>
                            <div className="ratingStarContainer">
                                <Stars num={review.VALUESTARS} isClickable={false} />
                            </div>
                        </div>
                        <div className="tripRatingItem">
                            <h4>Transport</h4>
                            <div className="ratingStarContainer">
                                <Stars num={review.TRANSPORTSTARS} isClickable={false} />
                            </div>
                        </div>
                    </div>
                    <div className="tripRatingRow">
                        <div className="tripRatingItem">
                            <h4>Meals</h4>
                            <div className="ratingStarContainer">
                                <Stars num={review.MEALSSTARS} isClickable={false} />
                            </div>
                        </div>
                        <div className="tripRatingItem">
                            <h4>Overall</h4>
                            <div className="ratingStarContainer">
                                <Stars num={review.OVERALLSTARS} isClickable={false} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gray-divider"></div>
            </div>
        </>
    )
}

export default MainReview
