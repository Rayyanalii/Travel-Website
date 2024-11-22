import React from "react";
import "../../pages/DestinationDescription.css";
import DestinationBestPlaceCard from "./DestinationBestPlaceCard";

const Hero = () => {
  return (
    <>
      <div className="DestinationPlacesMainContainer">
        <div className="DestinationNameContainer">
          <div>
            <h4>France</h4>
            <h2>Paris</h2>
            <br />
            <p>
              Money can't buy you happiness but it can buy a ticket to Paris.
            </p>
          </div>
        </div>
        <div className="destinationDescriptionBestPlacesToVisit">
          <div className="destinationBestPlaceMainContainer">
            <div className="destionationBestPlaceMainContainerHeading">
              <h2>Best Places To Visit</h2>
            </div>
            <div className="destionationBestPlaceImageContainer">
              <DestinationBestPlaceCard />
              <DestinationBestPlaceCard />
              <DestinationBestPlaceCard />
              <DestinationBestPlaceCard />
            </div>
            <div className="destinationBestPlaceBlackBackground"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
