import React from "react";
import "../../pages/DestinationDescription.css";

const WhatToEatCard = ({ invert }) => {
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
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          ></div>
          <div
            className={
              invert === "false"
                ? "whatToEatPlaceDescriptionContainer"
                : "whatToEatPlaceDescriptionContainer textInvertBack"
            }
          >
            <h3>Substance</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              minima incidunt quos consequuntur cumque rem odio. Voluptas
              veritatis porro omnis. Unde sapient
            </p>
          </div>
          <div
            className="whatToEatFoodImageContainer"
            style={{
              backgroundImage:
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default WhatToEatCard;
