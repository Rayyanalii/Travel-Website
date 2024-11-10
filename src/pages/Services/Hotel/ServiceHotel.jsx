import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Services/Hero";
import "../Hotel/ServiceHotel.css";
import { useEffect } from "react";
import ServiceHotelForm from "../../../components/Services/Hotel/ServiceHotelForm";
import ServiceAdvantages from "../../../components/Services/ServiceAdvantages";
import Footer from "../../../components/General/Footer";

const ServiceHotel = () => {
  useEffect(() => {
    // Apply background styles to the body
    document.body.style.backgroundImage =
      'linear-gradient(to bottom, rgba(17, 19, 19, 0.3), rgba(17, 19, 19, 0.7), #000), url("/Uploads/ServicesHotelBackgroundImage.png")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.overflow = "auto";

    // Clean up styles when the component is disposed
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.height = "";
      document.body.style.width = "";
    };
  }, []);
  return (
    <>
      <Navbar />
      <Hero
        title="Book a Hotel"
        para="Luxurious Hotels and Penthouses Available for you"
      />
      <ServiceHotelForm />
      <div className="ServiceAdvantagesMainContainer">
        <ServiceAdvantages title="Spacious and Luxurious" number="4" />
        <ServiceAdvantages title="Affordable Stay" number="5" />
        <ServiceAdvantages title="Flexible Cancellations" number="6" />
      </div>
      <div className="servicesDescriptionText">
        <h2>Why Travelers Love Vacation Rentals</h2>
        <br />
        <p>
          Vacation rentals are an increasingly popular alternative to
          traditional hotel stays. Why? Because they offer travelers the space,
          amenities, and privacy of home when on vacation… along with incredible
          value! Forget anonymous hotel rooms—from entire oceanfront houses with
          private beach access to city condos in luxury buildings, Rentals
          offers you places with personality to make your trips unforgettable.
          Choose from thousands of different rentals across the globe: chic
          apartments for solo business trips, cozy cottages for romantic
          getaways or spacious villas for family vacations. For stays to suit
          your needs and individual travel style, there’s nowhere better.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ServiceHotel;
