import React, { useEffect, useState } from 'react';
import './TripPackage.css';
import Hero from '../components/TripPackage/Hero';
import Main from '../components/TripPackage/Main';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const TripPackage = () => {
  const { id } = useParams(); // Extract the id from the URL parameters
  const [tripPackageData, setTripPackageData] = useState(null); // State to hold the trip package data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  const fetchTripPackage = async () => {
    try {

      const response = await fetch(`http://localhost:3000/trip-packages/${id}`); // Fetch data from the endpoint

      if (!response.ok) {
        throw new Error('Trip package not found'); // Handle errors if the response is not ok
      }

      const data = await response.json(); // Parse the response JSON

      setTripPackageData(data); // Set the data in state
    } catch (error) {
      setError(error.message); // Set the error message in state
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Fetch trip package data when the component mounts
  useEffect(() => {
    fetchTripPackage(); // Call the fetch function
  }, [id]); // Dependency array includes id to refetch if it changes

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if any
  }

  return (
    <>
      <Navbar />
      <Hero packageData={tripPackageData} /> {/* Pass the data to Hero if needed */}
      <Main packageData={tripPackageData} /> {/* Pass the data to Main if needed */}
    </>
  );
}

export default TripPackage;
