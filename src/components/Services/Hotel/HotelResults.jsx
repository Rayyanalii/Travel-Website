import React from "react";
import "../../../pages/Services/SearchResults/SearchResults.css";
import { useNavigate } from "react-router-dom";

const HotelResults = ({ data, userData }) => {
    const navigate = useNavigate();

    function handleSubmit() {

        navigate("/Hotels/payment", { state: { hotelDetails: data, userData: userData } });
    }
    return (
        <>
            <div className="carResultSearchMainContainer">
                <div className="carResultsRestPartition">
                    <div className="carResultsImageContainer">
                        <img src={data.HOTELIMAGES.split(",")[0]} alt="Hotel Image" style={{ objectFit: "contain", objectPosition: "center" }} />
                    </div>
                </div>
                <div className="carResultsMainTextPartition">
                    <div className="carResultMainTextRow">
                        <h3>Name:</h3>
                        <p>{data.HOTELNAME}</p>
                    </div>
                    <div className="carResultMainTextRow">
                        <div className="carResultMainTextRowSmallComponentLeft">
                            <h3>Class:</h3>
                            <p>{data.HOTELCLASS} star</p>
                        </div>
                        <div className="carResultMainTextRowSmallComponentRight">
                            <h3>City:</h3>
                            <p>{data.HOTELCITY}</p>
                        </div>
                    </div>
                </div>
                <div className="carResultsRestPartition">
                    <div className="carResultPriceButtonContainer">
                        <div className="carResultsPriceDescription">
                            <h3>${data.HOTELPRICEPERNIGHT}</h3>
                            <p>/ day</p>
                        </div>
                        <div>
                            <input type="submit" value="Book" className="redbutton" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelResults
