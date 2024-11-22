import React from "react";
import Navbar from "../components/Navbar";
import "../pages/DestinationDescription.css";
import Hero from "../components/DestinationDescription/Hero";
import Divider from "../components/DestinationDescription/Divider";
import WhatToEat from "../components/DestinationDescription/WhatToEat";
import WhereToStay from "../components/DestinationDescription/WhereToStay";
import Footer from "../components/General/Footer";
const DestinationDescription = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Divider />
      <WhatToEat />
      <Divider />
      <WhereToStay />
      <Footer />
    </>
  );
};

export default DestinationDescription;
