import React from "react";
import "../../pages/DestinationDescription.css";
import TripCard from "../TripCard";
import "../../pages/Home.css";

const AvailablePackages = ({ trip }) => {
  return (
    <>
      <div className="availablePackagesMainContainer">
        <div className="availablePackagesMainHeadingContainer">
          <h2>Available Packages</h2>
        </div>
        <div className="availablePackagesCardContainer">
          {trip.map((trip, index) => (
            <TripCard
              key={index}
              url={trip.IMAGE}
              route={`/TripPackage/${trip.TRIPPACKAGEID}/${encodeURIComponent(trip.TITLE)}`}
              title={trip.TITLE}
              desc={trip.CITY}
              price={trip.PRICE}
              star={trip.OVERALLRATING}
              time={trip.PACKAGEDURATION}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailablePackages;
