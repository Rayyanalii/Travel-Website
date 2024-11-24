import React from "react";
import "../../pages/Payment/PaymentPage.css";

const FlightBookingDetails = ({ details, userData }) => {
    return (
        <div className="booking-details">
            <h2>Flight Booking Details</h2>
            <p><strong>From:</strong> {details.FROMCITY}</p>
            <p><strong>To:</strong> {details.TOCITY}</p>
            <p><strong>Airline:</strong> {details.AIRLINE}</p>
            <p><strong>Departure Date:</strong> {details.DEPARTUREDATE}</p>
            <p><strong>Price per seat:</strong> ${details.SEATPRICE} </p>
            <p><strong>Passengers:</strong> {userData.passenger} </p>
            <p><strong>Total Price:</strong> ${details.SEATPRICE * userData.passenger}</p>

        </div>
    );
};

export default FlightBookingDetails;
