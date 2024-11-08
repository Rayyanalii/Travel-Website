import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Services/Hero";
import "../Hotel/ServiceHotel.css";
import { useEffect } from "react";

const ServiceHotel = () => {
  useEffect(() => {
    // Apply background styles to the body
    document.body.style.backgroundImage =
      'url("/ServicesHotelBackgroundImage.png")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";
    document.body.style.width = "100%";

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
    </>
  );
};

export default ServiceHotel;
