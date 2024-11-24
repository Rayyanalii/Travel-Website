import React from "react";
import "../../../pages/Services/SearchResults/SearchResults.css";
import { useNavigate } from "react-router-dom";


const FlightResults = ({ data, userData }) => {
  const navigate = useNavigate();


  function handleSubmit() {

    navigate("/Flights/payment", { state: { flightDetails: data, userData: userData } });
  }

  return (
    <>
      <div className="carResultSearchMainContainer">
        <div className="carResultsRestPartition">
          <div className="carResultsImageContainer">
            <img src={data.IMAGE} alt="" style={{ objectFit: "contain", objectPosition: "center" }} />
          </div>
        </div>
        <div className="carResultsMainTextPartition">
          <div className="carResultMainTextRow">
            <div className="carResultMainTextRowSmallComponentLeft">
              <h3>From:</h3>
              <p>{data.FROMCITY}</p>
            </div>
            <div className="carResultMainTextRowSmallComponentRight">
              <h3>To:</h3>
              <p>{data.TOCITY}</p>
            </div>
          </div>
          <div className="carResultMainTextRow">
            <div className="carResultMainTextRowSmallComponentLeft">
              <h3>Airline:</h3>
              <p>{data.AIRLINE}</p>
            </div>
            <div className="carResultMainTextRowSmallComponentRight">
              <h3>Departure Date:</h3>
              <p>{data.DEPARTUREDATE}</p>
            </div>

          </div>
        </div>
        <div className="carResultsRestPartition">
          <div className="carResultPriceButtonContainer">
            <div className="carResultsPriceDescription">
              <h3>${data.SEATPRICE}</h3>
              <p>/ person</p>
            </div>
            <div className="carResultsPriceDescription">
              <p>{data.AVAILABLESEATS} Seats left</p>
            </div>
            <div>
              <input type="submit" value="Book" className="redbutton" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightResults;
