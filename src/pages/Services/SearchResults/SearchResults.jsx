import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CarResults from "../../../components/Services/ServiceResults/CarResults";
import FlightResults from "../../../components/Services/ServiceResults/FlightResults";
import Footer from "./../../../components/General/Footer";
import HotelResults from "../../../components/Services/Hotel/HotelResults";

const SearchResults = () => {
  const [searchData, setsearchData] = useState([]);
  const [newFormData, setnewFormData] = useState(null);

  const { service } = useParams();
  const location = useLocation();
  const formData = location.state || null;

  // Fetch search results
  async function fetchCarSearchResults(city, cartype) {
    try {
      const response = await fetch(`http://localhost:3000/api/get-car-results/${city}/${cartype}`);
      if (!response.ok) {
        throw new Error("No results found");
      }
      const data = await response.json();
      setsearchData(data);
    } catch (error) {
      console.error("Error fetching car results:", error);
    }
  }

  async function fetchHotelSearchResults(city, hotelClass) {
    try {
      const response = await fetch(`http://localhost:3000/api/get-hotel-results/${city}/${hotelClass}`);
      if (!response.ok) {
        throw new Error("No results found");
      }
      const data = await response.json();
      setsearchData(data);
    } catch (error) {
      console.error("Error fetching Hotel results:", error);
    }
  }

  async function fetchFlightSearchResults(from, to, departure) {
    if (!departure || departure === "") {
      departure = "any"
    }
    try {
      const response = await fetch(`http://localhost:3000/api/get-flight-results/${from}/${to}/${departure}`);
      if (!response.ok) {
        throw new Error("No results found");
      }
      const data = await response.json();
      setsearchData(data);
    } catch (error) {
      console.error("Error fetching Flights results:", error);
    }
  }


  useEffect(() => {
    if (formData) {
      setnewFormData(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (service === "Cars" && newFormData?.city && newFormData?.cartype) {
      fetchCarSearchResults(newFormData.city, newFormData.cartype);
    }
    else if (service === "Hotels" && newFormData?.city && newFormData?.class > -1) {

      fetchHotelSearchResults(newFormData.city, newFormData.class);
    }
    else if (service === "Flights" && newFormData?.from && newFormData?.to) {

      fetchFlightSearchResults(newFormData.from, newFormData.to, newFormData.departure);
    }
  }, [service, newFormData]);

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
        Search Results For: {service} in {newFormData?.city || newFormData?.from || "Unknown City"}
      </h1>
      {service === "Cars" && searchData.length > 0 ? (
        <>
          {searchData.map((data, index) => (
            <CarResults key={index} data={data} userData={newFormData} />
          ))}
        </>
      ) : service === "Flights" && searchData.length > 0 ?
        <>
          {searchData.map((data, index) => (
            <FlightResults key={index} data={data} userData={newFormData} />
          ))}
        </>
        : service === "Hotels" && searchData.length > 0 ? <>
          {searchData.map((data, index) => (
            <HotelResults key={index} data={data} userData={newFormData} />
          ))}
        </> : (
          <p style={{
            color: "white",
            margin: "0 auto",
          }}>No results found!</p>
        )}
      <Footer />
    </>
  );
};

export default SearchResults;
