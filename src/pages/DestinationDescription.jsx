import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../pages/DestinationDescription.css";
import Hero from "../components/DestinationDescription/Hero";
import Divider from "../components/DestinationDescription/Divider";
import WhatToEat from "../components/DestinationDescription/WhatToEat";
import WhereToStay from "../components/DestinationDescription/WhereToStay";
import Footer from "../components/General/Footer";
import { useNavigate, useParams } from "react-router-dom";

const DestinationDescription = () => {

  const navigate = useNavigate();

  const [destinationData, setdestinationData] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([])
  const [hotels, sethotels] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripPackages, settripPackages] = useState([])


  const { id, city } = useParams();

  const fetchDestination = async () => {
    try {

      const response = await fetch(`http://localhost:3000/api/get-destination-desc/${id}`);
      if (!response.ok) {
        navigate("/error");

      }
      const data = await response.json();
      setdestinationData(data);



      const response1 = await fetch(`http://localhost:3000/api/get-destination-desc-places/${id}`);
      if (!response1.ok) {
        navigate("/error");
      }
      const data1 = await response1.json();
      setPlacesData(data1);


      const response2 = await fetch(`http://localhost:3000/api/get-destination-desc-restaurants/${id}`);
      if (!response2.ok) {
        navigate("/error");
      }
      const data2 = await response2.json();
      setRestaurantData(data2);



      const response3 = await fetch(`http://localhost:3000/api/get-destination-desc-hotels/${id}`);
      if (!response3.ok) {
        navigate("/error");
      }
      const data3 = await response3.json();
      sethotels(data3);



      const response4 = await fetch(`http://localhost:3000/api/get-destination-trips/${id}`);
      if (!response4.ok) {
        navigate("/error");
      }
      const data4 = await response4.json();
      settripPackages(data4);


    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDestination();
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <Navbar />
      <Hero data={destinationData} places={placesData} />

      <WhatToEat data={destinationData} rest={restaurantData} />

      <WhereToStay data={destinationData} stay={hotels} trip={tripPackages} />
      <Footer />
    </>
  );
};

export default DestinationDescription;
