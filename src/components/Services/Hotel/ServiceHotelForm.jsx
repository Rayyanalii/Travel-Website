import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/Services/Hotel/ServiceHotel.css";
import RatingStars from "../../TripPackage/RatingStars";
import { useAuth } from './../../../pages/Auth/AuthContext';

const ServiceHotelForm = () => {
  const [hotelClass, sethotelClass] = useState(0)
  const { loggedIn } = useAuth();
  const [formData, setFormData] = useState({
    city: "",
    checkin: "",
    room: "",
    days: "",
    class: "",
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
    formData.class = hotelClass
    if (loggedIn) {
      navigate("/Hotels/SearchResults", { state: formData });
    } else {
      alert("You need to login to book a hotel.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="HotelFormMainContainer">
        <div className="HotelFormPartition">
          <div className="cityParentContainer">
            <div className="HotelInputBox">
              <label htmlFor="city">Enter your City:</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="HotelTwoInputsFlex">
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="checkin">Check-in:</label>
                <input
                  type="date"
                  name="checkin"
                  id="checkin"
                  value={formData.checkin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="class">Class:</label>
                <RatingStars
                  setRating={sethotelClass} defaultvalue={hotelClass}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="HotelFormPartition">
          <div className="HotelTwoInputsFlex">
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="room">Rooms:</label>
                <input
                  type="number"
                  name="room"
                  id="room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="HotelTwoInputsSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="days">Days:</label>
                <input
                  type="number"
                  name="days"
                  id="days"
                  value={formData.days}
                  onChange={handleChange}
                  required
                  min="1"
                />
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
    </form>
  );
};

export default ServiceHotelForm;
