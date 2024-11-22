import React from "react";
import "../../pages/DestinationDescription.css";

const WhatToEatCard = ({ invert, data }) => {
  const imageURLs = data.RESTAURANTIMAGES.split(",");

  return (
    <>
      <div
        className={
          invert === "false"
            ? "whatToEatMainCardContainer"
            : "whatToEatMainCardContainer invert"
        }
      >
        <div className="whatToEatInnerMainContainer">
          <div
            className="whatToEatInsideImageContainer"
            style={{
              backgroundImage:
                `url(${imageURLs[0]})`,
            }}
          ></div>
          <div
            className={
              invert === "false"
                ? "whatToEatPlaceDescriptionContainer"
                : "whatToEatPlaceDescriptionContainer textInvertBack"
            }
          >
            <h3>{data.RESTAURANTNAME}</h3>
            <p>
              {data.RESTAURANTDESCRIPTION}
            </p>
          </div>
          <div
            className="whatToEatFoodImageContainer"
            style={{
              backgroundImage:
                `url(${imageURLs[1]})`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default WhatToEatCard;
