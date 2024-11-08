import React from "react";
import Hero from "../components/Services/Hero";
import Navbar from "../components/Navbar";
import ServiceFlightForm from "../components/Services/ServiceFlightForm";
import ServiceAdvantages from "../components/Services/ServiceAdvantages";
import "../pages/ServiceFlight.css";
import Footer from "../components/General/Footer";
import "../components/General/Footer.css";
import { useEffect } from "react";

const ServiceFlight = () => {
  useEffect(() => {
    // Apply background styles to the body
    document.body.style.backgroundImage =
      'url("/ServicesFlightBackgroundImage.png")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";
    document.body.style.width = "100%";

    // Clean up styles when the component is unmounted or the dependency 'third' changes
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
      <Hero title="Book a Flight" para="A perfect flight to your destination" />
      <ServiceFlightForm />
      <div className="ServiceAdvantagesMainContainer">
        <ServiceAdvantages title="Safe and Secure" number="1" />
        <ServiceAdvantages title="Convenient" number="2" />
        <ServiceAdvantages title="Customer Satisfaction" number="3" />
      </div>
      <div className="servicesDescriptionText">
        <h2>Booking flights now made easy:</h2>
        <br />
        <p>
          No need to shop multiple sites any more. We've already done that by
          searching hundreds of cheap flights for you– scouring premium
          airlines, low-cost carriers and the biggest online travel agencies for
          the best deals. We'll even check alternate dates and nearby airports
          to help you save money, time, even sanity on airline tickets.Our
          filters make it a snap to easily find the cheap flight that's right
          for you. Find direct flights that are nonstop, avoid early departure
          times— or try our Best Value filter, which sorts based on price,
          duration, and additional factors. No need to shop multiple sites any
          more. We've already done that by searching hundreds of cheap flights
          for you– scouring premium airlines, low-cost carriers and the biggest
          online travel agencies for the best deals. We'll even check alternate
          dates and nearby airports to help you save money, time, even sanity on
          airline tickets.Our filters make it a snap to easily find the cheap
          flight that's right for you. Find direct flights that are nonstop,
          avoid early departure times— or try our Best Value filter, which sorts
          based on price, duration, and additional factors.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ServiceFlight;
