import React, { useEffect } from "react";
import "../../pages/Payment/PaymentPage.css";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 4000);

        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <div className="booking-confirmed-page">
            <div className="animation-container">
                <div className="checkmark-circle">
                    <div className="checkmark"></div>
                </div>
                <h1 className="confirmation-message">Booking Confirmed!</h1>
                <p className="confirmation-description">
                    Your booking has been successfully processed. We’ve sent you a confirmation email with the details.
                </p>
            </div>
        </div>
    );
};

export default ConfirmationPage;
