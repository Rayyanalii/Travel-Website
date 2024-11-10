import React from "react";
import "../../../pages/Services/Hotel/ServiceHotel.css";
import RatingStars from "../../TripPackage/RatingStars";

const ServiceHotelForm = () => {
  return (
    <>
      <div className="HotelFormMainContainer">
        <div className="HotelFormPartition">
          <div className="cityParentContainer">
            <div className="HotelInputBox">
              <label htmlFor="city">Enter your City:</label>
              <input type="text" name="city" id="city" required />
            </div>
          </div>
          <div className="HotelTwoInputsFlex">
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="checkin">Check in:</label>
                <input type="date" name="checkin" id="checkin" required />
              </div>
            </div>
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="class">Class:</label>
                <RatingStars />
              </div>
            </div>
          </div>
        </div>
        <div className="HotelFormPartition">
          <div className="HotelTwoInputsFlex">
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="room">Rooms:</label>
                <input type="number" name="room" id="room" />
              </div>
            </div>
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="days">Days:</label>
                <input type="number" name="days" id="days" />
              </div>
            </div>
          </div>
          <div className="cityParentContainer">
            <div className="HotelInputBox">
              <input type="submit" value="Book Hotel" className="redbutton" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceHotelForm;
