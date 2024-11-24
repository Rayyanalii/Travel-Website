import React from "react";
import "../../../pages/Services/SearchResults/SearchResults.css";
import { useNavigate } from "react-router-dom";

const CarResults = ({ data, userData }) => {
  const navigate = useNavigate();

  function handleSubmit() {

    navigate("/Cars/payment", { state: { carDetails: data, userData: userData } });
  }

  console.table(data)

  return (
    <>
      <div className="carResultSearchMainContainer">
        <div className="carResultsRestPartition">
          <div className="carResultsImageContainer">
            <img src={data.CARIMAGE} alt="Car Image" />
          </div>
        </div>
        <div className="carResultsMainTextPartition">
          <div className="carResultMainTextRow">
            <h3>Name:</h3>
            <p>{data.CARMAKE} {data.CARMODEL} {data.CARYEAR}</p>
          </div>
          <div className="carResultMainTextRow">
            <div className="carResultMainTextRowSmallComponentLeft">
              <h3>Type:</h3>
              <p>{data.CARTYPE}</p>
            </div>
            <div className="carResultMainTextRowSmallComponentRight">
              <h3>City:</h3>
              <p>{data.CARLOCATION}</p>
            </div>
          </div>
        </div>
        <div className="carResultsRestPartition">
          <div className="carResultPriceButtonContainer">
            <div className="carResultsPriceDescription">
              <h3>${data.CARPRICE}</h3>
              <p>/ day</p>
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

export default CarResults;
