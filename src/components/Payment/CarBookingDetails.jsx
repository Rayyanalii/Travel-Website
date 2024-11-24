import React from "react";
import "../../pages/Payment/PaymentPage.css";

const CarBookingDetails = ({ details, userData }) => {
    return (
        <div className="booking-details">
            <h2>Car Booking Details</h2>
            <p><strong>Name:</strong> {details.CARMAKE} {details.CARMODEL} {details.CARYEAR}</p>
            <p><strong>Type:</strong> {details.CARTYPE}</p>
            <p><strong>City:</strong> {details.CARLOCATION}</p>
            <p><strong>Pickup Date:</strong> {userData.pickup}</p>
            <p><strong>Price per day:</strong> ${details.CARPRICE} / day</p>
            <p><strong>Total Price:</strong> ${details.CARPRICE * userData.carDays}</p>
            <img src={details.CARIMAGE} alt="Car Image" style={{ width: "100%", paddingTop: "15px", objectFit: "cover", objectPosition: "center", borderRadius: "10px" }} />

        </div>
    );
};

export default CarBookingDetails;
