import React from "react";
import "../../pages/ServiceFlight.css";

const Hero = (props) => {
  return (
    <div>
      <div className="servicesBackgroundImage">
        <div className="servicesTitle">
          <h1>{props.title}</h1>
          <p>{props.para}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
