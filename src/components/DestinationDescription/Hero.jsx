import React from "react";
import "../../pages/DestinationDescription.css";
import DestinationBestPlaceCard from "./DestinationBestPlaceCard";

const Hero = ({ data, places }) => {

  return (
    <>
      <div className="DestinationPlacesMainContainer" style={{ backgroundImage: `url(${data[0].IMAGES.split(",")[0]})` }}>
        <div className="DestinationNameContainer">
          <div>
            <h4>{data[0].COUNTRY}</h4>
            <h2>{data[0].CITY}</h2>
            <br />
            <p>
              {data[0].CAPTION}
            </p>
          </div>
        </div>
        <div className="destinationDescriptionBestPlacesToVisit">
          <div className="destinationBestPlaceMainContainer">
            <div className="destionationBestPlaceMainContainerHeading">
              <h2>Best Places To Visit</h2>
            </div>
            <div className="destionationBestPlaceImageContainer">
              {places.map((place, index) => (
                <DestinationBestPlaceCard key={index} data={place} />
              ))}
            </div>
            <div className="destinationBestPlaceBlackBackground"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
