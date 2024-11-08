import React from 'react'
import Stars from '../General/Stars'

const Ratings = () => {
  return (
    <>
    <div className="tripRatingsContainer">
        <h3>Ratings</h3>
        <div className="tripRatingsItemsContainer">
            <div className="tripRatingRow">
                <div className="tripRatingItem">
                    <h4>Accomodation</h4>
                    <div className="ratingStarContainer">
                    <Stars num="4"/>
                    </div>
                </div>
                <div className="tripRatingItem">
                    <h4>Destination</h4>
                    <div className="ratingStarContainer">
                    <Stars num="5"/>
                    </div>
                </div>
            </div>
            <div className="tripRatingRow">
                <div className="tripRatingItem">
                    <h4>Value for money</h4>
                    <div className="ratingStarContainer">
                    <Stars num="5"/>
                    </div>
                </div>
                <div className="tripRatingItem">
                    <h4>Transport</h4>
                    <div className="ratingStarContainer">
                    <Stars num="4"/>
                    </div>
                </div>
            </div>
            <div className="tripRatingRow">
                <div className="tripRatingItem">
                    <h4>Meals</h4>
                    <div className="ratingStarContainer">
                    <Stars num="4"/>
                    </div>
                </div>
                <div className="tripRatingItem">
                    <h4>Overall</h4>
                    <div className="ratingStarContainer">
                    <Stars num="5"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Ratings
