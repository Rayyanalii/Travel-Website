import React from 'react'
import './TripCard.css'

const TripCard = (props) => {
    return (
        <>
            <div className="TripCardContainer">
                <a href="/" className='TripCardATag'>
                    <div className="TripImageContainer">
                        <img src={props.url} alt="" />
                        <div className="priceContainer">
                            <p>{props.price}</p>
                        </div>

                    </div>
                    <div className="tripCardText">
                        <h3>{props.title}</h3>
                        <p>{props.desc}</p>
                    </div>
                    <div className="starAndTime">

                    </div>
                </a>
            </div>

        </>
    )
}

export default TripCard
