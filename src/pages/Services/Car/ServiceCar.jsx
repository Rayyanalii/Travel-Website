import React from "react";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Services/Hero";
import ServiceCarForm from "../../../components/Services/Car/ServiceCarForm";
import ServiceAdvantages from "../../../components/Services/ServiceAdvantages";
import Footer from "../../../components/General/Footer";
const ServiceCar = () => {
  useEffect(() => {
    // Apply background styles to the body
    document.body.style.backgroundImage =
      'linear-gradient(to bottom, rgba(17, 19, 19, 0.3), rgba(17, 19, 19, 0.7), #000),url("/ServicesCarBackgroundImage.png")';

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top";
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
      <Hero
        title="Rent a Car"
        para="A perfect flight to your Finest Car Rental Services Available at your Disposal"
      />
      <ServiceCarForm />
      <div className="ServiceAdvantagesMainContainer">
        <ServiceAdvantages title="Worldwide Coverage" number="7" />
        <ServiceAdvantages title="Affordable Rates" number="8" />
        <ServiceAdvantages title="First Class Service" number="9" />
      </div>
      <div className="servicesDescriptionText">
        <h2>How our system works:</h2>
        <br />
        <p>
          As one of the world’s best travel site, we make every step of your car
          rental experience simple and fast. Whether you’re ready to explore the
          coast and catch some sun in a sleek convertible, or looking for a
          large-capacity vehicle for a family road trip, we’ll find you the
          perfect rental car. You can easily filter your search results on
          criteria like vehicle type, pick-up and drop-off dates, your budget,
          and number of passengers with you as well. You’ll also have the
          ability to customize your pick-up and drop-off locations, so one-way
          trips have never been easier. Millions of people around the world
          trust us to help plan every aspect of their trip including searching
          for rental cars. By leveraging the world’s largest rental car booking
          service and searching all major rental brands, we help you find the
          lowest rental car prices available. We offer comprehensive coverage of
          over 60,000 locations worldwide.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ServiceCar;
