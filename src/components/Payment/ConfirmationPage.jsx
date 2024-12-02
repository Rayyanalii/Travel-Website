import React, { useEffect, useState } from "react";
import "../../pages/Payment/PaymentPage.css";
import { useNavigate } from "react-router-dom";


const ConfirmationPage = () => {
    const [showButton, setShowButton] = useState(false); // State for button visibility
    const navigate = useNavigate();
    useEffect(() => {
        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 3000);
        return () => {

            clearTimeout(buttonTimer);
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
                    Your booking has been successfully processed. Thank you for your purchase.
                </p>
                <button
                    className={`fade-in-button ${showButton ? "fade-in" : ""}`}
                    onClick={() => navigate("/")}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default ConfirmationPage;
