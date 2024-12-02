import React, { useState } from "react";
import "../../pages/Payment/PaymentPage.css";

const PaymentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cardNumber = formData.cardNumber;
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        const cvv = formData.cvv;

        if (!/^\d{3}$/.test(cvv)) {
            alert("Please enter a valid 3-digit CVV number.");
            return;
        }

        onSubmit(formData);
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="payment-section">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        placeholder="Cardholder name"

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        minLength={16}
                        maxLength={16}
                        placeholder="Card Number"
                    />
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="date"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                            min={today}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            maxLength={3}
                            minLength={3}
                            placeholder="CVV"
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
