import React from "react";
import "../../pages/ServiceFlight.css";
import { GiCommercialAirplane } from "react-icons/gi";
import { PiSmileyFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";

const ServiceAdvantages = (props) => {
  return (
    <>
      <div className="advantagesContainer">
        <div className="advantagesLogo">
          {props.number == "1" ? (
            <GiCommercialAirplane className="advantagesLogoImage" />
          ) : props.number == "2" ? (
            <PiSmileyFill className="advantagesLogoImage" />
          ) : (
            <FaHandshake className="advantagesLogoImage" />
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
