import React from "react";
import Navbar from "../../../components/Navbar";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CarResults from "../../../components/Services/ServiceResults/CarResults";
import FlightResults from "../../../components/Services/ServiceResults/FlightResults";
import Footer from "./../../../components/General/Footer";

const SearchResults = () => {
  const a = useParams();
  const location = useLocation();
  const formData = location.state || {};
  console.log(formData);

  return (
    <>
      <Navbar />
      <h1
        style={{
          color: "white",
          maxWidth: "55%",
          margin: "2em auto 1em auto",
        }}
      >
        Search Results For: {a.service} in {formData.hotelCity}
      </h1>
      {a.service === "Cars" && formData ? (
        <>
          <CarResults />
          <CarResults />
          <CarResults />
        </>
      ) : a.service === "Flight" && formData ? (
        <>
          <FlightResults />
          <FlightResults />
          <FlightResults />
        </>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};

export default SearchResults;
