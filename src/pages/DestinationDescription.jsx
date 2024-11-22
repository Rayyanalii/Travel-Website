import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../pages/DestinationDescription.css";
import Hero from "../components/DestinationDescription/Hero";
import Divider from "../components/DestinationDescription/Divider";
import WhatToEat from "../components/DestinationDescription/WhatToEat";
import WhereToStay from "../components/DestinationDescription/WhereToStay";
import Footer from "../components/General/Footer";
import { useParams } from "react-router-dom";
const DestinationDescription = () => {

  const [destinationData, setdestinationData] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([])
  const [hotels, sethotels] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id, city } = useParams();

  const fetchDestination = async () => {
    try {

      const response = await fetch(`http://localhost:3000/api/get-destination-desc/${id}`);
      if (!response.ok) {
        throw new Error('Destination not found');
      }
      const data = await response.json();
      setdestinationData(data);



      const response1 = await fetch(`http://localhost:3000/api/get-destination-desc-places/${id}`);
      if (!response1.ok) {
        throw new Error('Destination not found');
      }
      const data1 = await response1.json();
      setPlacesData(data1);


      const response2 = await fetch(`http://localhost:3000/api/get-destination-desc-restaurants/${id}`);
      if (!response2.ok) {
        throw new Error('Destination not found');
      }
      const data2 = await response2.json();
      setRestaurantData(data2);



      const response3 = await fetch(`http://localhost:3000/api/get-destination-desc-hotels/${id}`);
      if (!response3.ok) {
        throw new Error('Destination not found');
      }
      const data3 = await response3.json();
      sethotels(data3);




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
      <Divider />
      <WhatToEat data={destinationData} rest={restaurantData} />
      <Divider />
      <WhereToStay data={destinationData} stay={hotels} />
      <Footer />
    </>
  );
};

export default DestinationDescription;
