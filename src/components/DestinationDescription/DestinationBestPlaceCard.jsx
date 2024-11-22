import React from "react";
import "../../pages/DestinationDescription.css";

const DestinationBestPlaceCard = ({ data }) => {
  return (
    <>
      <div
        className="destionationBestPlaceCardContainer"
        style={{
          backgroundImage:
            `url(${data.PLACEIMAGES.split(",")[0]})`,
        }}
      ></div>
    </>
  );
};

export default DestinationBestPlaceCard;
