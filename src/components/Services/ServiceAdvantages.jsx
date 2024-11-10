import React from "react";
import "../../pages/ServiceFlight.css";
import { GiCommercialAirplane } from "react-icons/gi";
import { PiSmileyFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { IoWalletSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { IoEarthSharp } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { FaThumbsUp } from "react-icons/fa6";

const ServiceAdvantages = (props) => {
  return (
    <>
      <div className="advantagesContainer">
        <div className="advantagesLogo">
          {props.number == "1" ? (
            <GiCommercialAirplane className="advantagesLogoImage" />
          ) : props.number == "2" ? (
            <PiSmileyFill className="advantagesLogoImage" />
          ) : props.number == "3" ? (
            <FaHandshake className="advantagesLogoImage" />
          ) : props.number == "4" ? (
            <FaHotel className="advantagesLogoImage" id="advantagesHotelLogo" />
          ) : props.number == "5" ? (
            <IoWalletSharp className="advantagesLogoImage" />
          ) : props.number == "6" ? (
            <GiCheckMark className="advantagesLogoImage" />
          ) : props.number == "7" ? (
            <IoEarthSharp className="advantagesLogoImage" />
          ) : props.number == "8" ? (
            <GiCash className="advantagesLogoImage" />
          ) : (
            <FaThumbsUp className="advantagesLogoImage" />
          )}
        </div>
        <div className="advantagesText">
          <h3>{props.title}</h3>
          <p>Lorem, ipsum dolor sit amet consectetur</p>
        </div>
      </div>
    </>
  );
};

export default ServiceAdvantages;
