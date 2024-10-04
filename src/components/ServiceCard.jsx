import React from 'react'
import './ServiceCard.css'
import RedButton from './RedButton'
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";

const ServiceCard = (props) => {


    return (
        <>
            <div className="serviceContainer">
                <div className="serviceTitleAndDesc">
                    <h3>{props.title}</h3>
                    <p>{props.desc}</p>
                </div>
                {props.iden=="car"?<FaCarSide className='carServiceSVG'/>:props.iden=="plane"?<FaPlane className='planeServiceSVG'/>:<FaHotel className='hotelServiceSVG'/>}
                <div className='serviceButtonContainer'>
                    <RedButton className="serviceButton"/>
                </div>
            </div>
        </>
    )
}

export default ServiceCard
