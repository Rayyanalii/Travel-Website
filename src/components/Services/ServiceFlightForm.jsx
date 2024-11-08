import React from "react";
import "../../pages/ServiceFlight.css";

const ServiceFlightForm = () => {
  return (
    <>
      <div className="FlightformContainer">
        <div className="partition">
          <div className="fromParentContainer">
            <div className="flightInputBox">
              <label htmlFor="from">From:</label>
              <input type="text" name="from" id="from" required />
            </div>
          </div>
          <div className="passengerDepartureFlex">
            <div className="departurePassengerSmallContainer">
              <div className="flightInputBox">
                <label htmlFor="from">Departure:</label>
                <input type="date" name="from" id="from" required />
              </div>
            </div>
            <div className="departurePassengerSmallContainer">
              <div className="flightInputBox">
                <label htmlFor="from">Passenger:</label>
                <input type="number" name="from" id="from" required />
              </div>
            </div>
          </div>
        </div>
        <div className="partition">
          <div className="fromParentContainer">
            <div className="flightInputBox">
              <label htmlFor="from">To:</label>
              <input type="text" name="from" id="from" required />
            </div>
          </div>
          <div className="fromParentContainer">
            <div className="flightInputBox">
              <input type="submit" value="Book Flight" className="redbutton" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceFlightForm;
