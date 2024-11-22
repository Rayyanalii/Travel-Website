import React from "react";
import "../../../pages/Services/SearchResults/SearchResults.css";

const CarResults = () => {
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
            <h3>Name:</h3>
            <p>Rolls Royce Phantom 2010</p>
          </div>
          <div className="carResultMainTextRow">
            <div className="carResultMainTextRowSmallComponent">
              <h3>Type:</h3>
              <p>Sedan</p>
            </div>
            <div className="carResultMainTextRowSmallComponent">
              <h3>City:</h3>
              <p>Paris</p>
            </div>
          </div>
        </div>
        <div className="carResultsRestPartition">
          <div className="carResultPriceButtonContainer">
            <div className="carResultsPriceDescription">
              <h3>$5000</h3>
              <p>/ day</p>
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

export default CarResults;
