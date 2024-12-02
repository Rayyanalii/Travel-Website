import React from 'react'
import './ServiceCard.css'
import RedButton from './RedButton'
import { Link } from 'react-router-dom';
import { IoCarSport } from "react-icons/io5";
import { IoIosAirplane } from "react-icons/io";
import { GiHouse } from "react-icons/gi";

const ServiceCard = (props) => {


    return (
        <>
            <div className="serviceContainer">
                <div className="serviceTitleAndDesc">
                    <h3>{props.title}</h3>
                    <p>{props.desc}</p>
                </div>
                {props.iden == "car" ? <IoCarSport className='carServiceSVG' /> : props.iden == "plane" ? <IoIosAirplane className='planeServiceSVG' /> : <GiHouse className='hotelServiceSVG' />}
                <div className='serviceButtonContainer'>
                    <Link to={props.iden == "car" ? "/ServiceCar" : props.iden == "plane" ? "/ServiceFlight" : "/ServiceHotel"}><RedButton className="serviceButton" review={false} desc="Go!" /></Link>

                </div>
            </div>
        </>
    )
}

export default ServiceCard
