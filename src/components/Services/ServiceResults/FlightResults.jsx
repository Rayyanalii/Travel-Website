import React from "react";
import "../../../pages/Services/SearchResults/SearchResults.css";

const FlightResults = () => {
  return (
    <>
      <div className="carResultSearchMainContainer">
        <div className="carResultsRestPartition">
          <div className="carResultsImageContainer">
            <img src="/Uploads/EiffelTower1.jpg" alt="" />
          </div>
        </div>
        <div className="carResultsMainTextPartition">
          <div className="carResultMainTextRow">
            <div className="carResultMainTextRowSmallComponentLeft">
              <h3>From:</h3>
              <p>Karachi</p>
            </div>
            <div className="carResultMainTextRowSmallComponentRight">
              <h3>To:</h3>
              <p>Paris</p>
            </div>
          </div>
          <div className="carResultMainTextRow">
            <div className="carResultMainTextRowSmallComponentLeft">
              <h3>Airline:</h3>
              <p>Emirates</p>
            </div>
            <div className="carResultMainTextRowSmallComponentRight">
              <h3>Departure Date:</h3>
              <p>12-Jan-2024</p>
            </div>
          </div>
        </div>
        <div className="carResultsRestPartition">
          <div className="carResultPriceButtonContainer">
            <div className="carResultsPriceDescription">
              <h3>$1200</h3>
              <p>/ person</p>
            </div>
            <div>
              <input type="submit" value="Book" className="redbutton" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightResults;
