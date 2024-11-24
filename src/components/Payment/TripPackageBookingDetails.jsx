import React from 'react'

const TripPackageBookingDetails = ({ details }) => {
    return (
        <div className="booking-details">
            <h2>Trip Booking Details</h2>
            <p><strong>Package Name:</strong> {details.TITLE} {details.CARMODEL} {details.CARYEAR}</p>
            <p><strong>City:</strong> {details.CITY}</p>
            <p><strong>Duration:</strong> {details.PACKAGEDURATION} days</p>
            <p><strong>Price:</strong> ${details.PRICE}</p>
            <img src={details.IMAGE} alt="Trip Image" style={{ width: "100%", paddingTop: "15px", objectFit: "cover", objectPosition: "center", borderRadius: "10px" }} />

        </div>
    )
}

export default TripPackageBookingDetails
