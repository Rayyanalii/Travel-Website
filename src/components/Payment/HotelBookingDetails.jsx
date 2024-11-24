import React from "react";
import "../../pages/Payment/PaymentPage.css";

const HotelBookingDetails = ({ details, userData }) => {
    return (
        <div className="booking-details">
            <h2>Hotel Booking Details</h2>
            <p><strong>Name:</strong> {details.HOTELNAME}</p>
            <p><strong>City:</strong> {details.HOTELCITY}</p>
            <p><strong>Class:</strong> {details.HOTELCLASS} star</p>
            <p><strong>Number of Rooms:</strong> {userData.room}</p>
            <p><strong>Check-in Date:</strong> {userData.checkin}</p>
            <p><strong>Number of Days:</strong> {userData.days}</p>
            <p><strong>Price per night:</strong> ${details.HOTELPRICEPERNIGHT} / night</p>
            <p><strong>Total Price:</strong> ${details.HOTELPRICEPERNIGHT * userData.room * userData.days}</p>
            <img src={details.HOTELIMAGES.split(",")[0]} alt="Hotel Image" style={{ width: "100%", paddingTop: "15px", objectFit: "cover", objectPosition: "center", borderRadius: "10px" }} />

        </div>
    );
};

export default HotelBookingDetails;
