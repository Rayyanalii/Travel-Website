import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/ServiceFlight.css";
import { useAuth } from './../../pages/Auth/AuthContext';


const ServiceFlightForm = () => {
  const { loggedIn } = useAuth();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    passenger: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loggedIn) {
      navigate("/Flights/SearchResults", { state: formData });
    }
    else {
      alert("You Need To Login To Book A Flight")
    }
  };
  const today = new Date().toISOString().split("T")[0];


  return (
    <form onSubmit={handleSubmit}>
      <div className="FlightformContainer">
        <div className="partition">
          <div className="fromParentContainer">
            <div className="flightInputBox">
              <label htmlFor="from">From:</label>
              <input
                type="text"
                name="from"
                id="from"
                value={formData.from}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>
          </div>
          <div className="passengerDepartureFlex">
            <div className="departurePassengerSmallContainer">
              <div className="flightInputBox">
                <label htmlFor="departure">Departure:</label>
                <input
                  type="date"
                  name="departure"
                  id="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  min={today}

                />
              </div>
            </div>
            <div className="departurePassengerSmallContainer">
              <div className="flightInputBox">
                <label htmlFor="passenger">Passenger:</label>
                <input
                  type="number"
                  name="passenger"
                  id="passenger"
                  value={formData.passenger}
                  onChange={handleChange}
                  required
                  min={1}
                  placeholder="Passengers"

                />
              </div>
            </div>
          </div>
        </div>
        <div className="partition">
          <div className="fromParentContainer">
            <div className="flightInputBox">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                name="to"
                id="to"
                value={formData.to}
                onChange={handleChange}
                required
                placeholder="City"

              />
            </div>
          </div>
          <div className="fromParentContainer">
            <div className="flightInputBox">
              <input type="submit" value="Book Flight" className="redbutton" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceFlightForm;
