import React, { useEffect, useState } from "react";
import PaymentForm from "../../components/Payment/PaymentForm";
import "./PaymentPage.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/General/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CarBookingDetails from "../../components/Payment/CarBookingDetails";
import TripPackageBookingDetails from "../../components/Payment/TripPackageBookingDetails";
import HotelBookingDetails from "../../components/Payment/HotelBookingDetails";
import FlightBookingDetails from "../../components/Payment/FlightBookingDetails";


const PaymentPage = () => {
    const { page } = useParams();
    const [success, setsuccess] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();


    const [details, setDetails] = useState(location.state?.tripDetails || location.state?.carDetails || location.state?.hotelDetails || location.state?.flightDetails || null);
    const [userDetails, setUserDetails] = useState(location.state?.userData || null);


    const handleSubmit = async (data) => {

        const formData = new FormData();
        formData.append("userID", localStorage.getItem("userID"));
        if (page == "Cars") {
            formData.append("carID", details.CARID);
            formData.append("carRentedDays", userDetails.carDays);
            formData.append("carPickupDate", userDetails.pickup);
            formData.append("totalAmount", details.CARPRICE * userDetails.carDays);

            try {
                const response = await fetch("http://localhost:3000/api/add-car-booking", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                } else {
                    const result = await response.json();
                    setsuccess(true);


                }
            } catch (error) {
                // Handle fetch error
                setError("Something went wrong, please try again later.");
            }
        }
        else if (page === "tripPackage") {
            formData.append("packageID", details.TRIPPACKAGEID);

            try {
                const response = await fetch("http://localhost:3000/api/add-trip-booking", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                } else {
                    const result = await response.json();
                    setsuccess(true);
                }
            } catch (error) {
                // Handle fetch error
                setError("Something went wrong, please try again later.");
            }
        }
        else if (page === "Hotels") {
            formData.append("hotelID", details.HOTELID);
            formData.append("hotelBookDays", userDetails.days);
            formData.append("hotelBookRooms", userDetails.room);
            formData.append("hotelCheckInDate", userDetails.checkin);
            formData.append("totalPrice", details.HOTELPRICEPERNIGHT * userDetails.room * userDetails.days);

            try {
                const response = await fetch("http://localhost:3000/api/add-hotel-booking", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                } else {
                    const result = await response.json();
                    setsuccess(true);
                }
            } catch (error) {
                // Handle fetch error
                setError("Something went wrong, please try again later.");
            }
        }
        else if (page === "Flights") {
            formData.append("flightID", details.FLIGHTID);
            formData.append("passengers", userDetails.passenger);
            formData.append("totalPrice", userDetails.passenger * details.SEATPRICE);

            try {
                const response = await fetch("http://localhost:3000/api/add-flight-booking", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                } else {
                    const result = await response.json();
                    setsuccess(true);
                }
            } catch (error) {
                // Handle fetch error
                setError("Something went wrong, please try again later.");
            }
        }

    };

    useEffect(() => {
        if (success) {
            navigate(`/${page}/payment/confirmation`);
        }
    }, [success, navigate]);

    return (
        <>
            <Navbar />
            <div className="payment-page">
                <PaymentForm onSubmit={handleSubmit} />
                {page === "Cars" ? <CarBookingDetails details={details} userData={userDetails} /> : page === "tripPackage" ? <TripPackageBookingDetails details={details} /> : page === "Hotels" ? <HotelBookingDetails details={details} userData={userDetails} /> : page === "Flights" ? <FlightBookingDetails details={details} userData={userDetails} /> : <><p>No data Found</p></>}


            </div>
            <Footer />
        </>
    );
};

export default PaymentPage;
