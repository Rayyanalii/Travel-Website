import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/Services/Car/ServiceCar.css";

const ServiceCarForm = () => {
  const [formData, setFormData] = useState({
    hotelCity: "",
    pickup: "",
    hotelDays: "",
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
    // Navigate to SearchResults and pass formData
    navigate("/Cars/SearchResults", { state: formData });
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
                name="hotelCity"
                id="hotelCity"
                value={formData.hotelCity}
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
                  name="hotelDays"
                  id="hotelDays"
                  value={formData.hotelDays}
                  onChange={handleChange}
                  required
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
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="convertible">Convertible</option>
                <option value="pickup">Pickup Truck</option>
                <option value="minivan">Minivan</option>
                <option value="luxury">Luxury</option>
                <option value="sports">Sports Car</option>
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
