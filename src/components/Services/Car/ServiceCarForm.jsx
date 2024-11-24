import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/Services/Car/ServiceCar.css";
import { useAuth } from './../../../pages/Auth/AuthContext';

const ServiceCarForm = () => {
  const { loggedIn } = useAuth();
  const [formData, setFormData] = useState({
    city: "",
    pickup: "",
    carDays: "",
    cartype: "",
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
      navigate("/Cars/SearchResults", { state: formData });
    }
    else {
      alert("You Need To Login To Book A Car")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="CarformContainer">
        <div className="CarFormPartition">
          <div className="HotelCityParentContainer">
            <div className="HotelInputBox">
              <label htmlFor="hotelCity">Enter your city:</label>
              <input
                type="text"
                name="city"
                id="hotelCity"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="PickupAndDaysFlex">
            <div className="PickupAndDaysSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="pickup">Pickup Date:</label>
                <input
                  type="date"
                  name="pickup"
                  id="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="PickupAndDaysSmallContainer">
              <div className="HotelInputBox">
                <label htmlFor="hotelDays">Enter Days:</label>
                <input
                  type="number"
                  name="carDays"
                  id="hotelDays"
                  value={formData.carDays}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="CarFormPartition">
          <div className="HotelCityParentContainer">
            <div className="HotelInputBox">
              <label htmlFor="cartype">Select Car Type:</label>
              <select
                name="cartype"
                id="cartype"
                value={formData.cartype}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Car Type --</option>
                <option value="any">Any</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Convertible">Convertible</option>
                <option value="Pickup">Pickup Truck</option>
                <option value="Minivan">Minivan</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports Car</option>
              </select>
            </div>
          </div>
          <div className="HotelCityParentContainer">
            <div className="HotelInputBox">
              <input type="submit" value="Book Car" className="redbutton" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceCarForm;
