import React from "react";
import "../../pages/DestinationDescription.css";
import TripCard from "../TripCard";
import "../../pages/Home.css";

const AvailablePackages = () => {
  return (
    <>
      <div className="availablePackagesMainContainer">
        <div className="availablePackagesMainHeadingContainer">
          <h2>Available Packages</h2>
        </div>
        <div className="availablePackagesCardContainer">
          <TripCard
            url="/Uploads/ParisTripCard.png"
            route="/TripPackage/1/Konnichiwa"
            title="Konnichiwa"
            desc="City tours, iconic"
            price="$3000"
            star="4"
            time="5"
          />
          <TripCard
            url="/Uploads/ParisTripCard.png"
            route="/TripPackage/1/Konnichiwa"
            title="Konnichiwa"
            desc="City tours, iconic"
            price="$3000"
            star="4"
            time="5"
          />
        </div>
      </div>
    </>
  );
};

export default AvailablePackages;
