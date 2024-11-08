import React from 'react'
import './TripCard.css'
import { IoIosStar } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const TripCard = (props) => {
    return (
        <>
            <div className="TripCardContainer">
                <Link to={props.route} className='TripCardATag'>
                    <div className="TripImageContainer">
                        <img src={props.url} alt="" />
                        <div className="priceContainer">
                            <p>{props.price}</p>
                        </div>

                    </div>
                    <div className="tripCardBottom">
                        <div className="tripCardText">
                            <h3>{props.title}</h3>
                            <p>{props.desc}</p>
                        </div>
                        <div className="starAndTime">
                            <div className="allStars">
                                {props.star == 1 ? <><IoIosStar className='redtripCardStar' /><IoIosStar className='whitetripCardStar' /><IoIosStar className='whitetripCardStar' /><IoIosStar className='whitetripCardStar' /><IoIosStar className='whitetripCardStar' /></> : props.star == 2 ? <><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='whitetripCardStar' /><IoIosStar className='whitetripCardStar' /><IoIosStar className='whitetripCardStar' /></> : props.star == 3 ? <><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='whitetripCardStar' /><IoIosStar className='whitetripCardStar' /></> : props.star == 4 ? <><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='whitetripCardStar' /></> : <><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /><IoIosStar className='redtripCardStar' /></>}
                            </div>
                            <div className="clockAndTime">
                                <FaClock className='tripCardClock' />
                                <p>{props.time} days</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default TripCard
