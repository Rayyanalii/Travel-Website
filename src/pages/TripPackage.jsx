import React, { useEffect, useState } from 'react';
import './TripPackage.css';
import Hero from '../components/TripPackage/Hero';
import Main from '../components/TripPackage/Main';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import Footer from './../components/General/Footer';

const TripPackage = () => {
  const { id, name } = useParams();
  const [tripPackageData, setTripPackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTripPackage = async () => {
    try {

      const response = await fetch(`http://localhost:3000/api/get-trip-package/${id}`);
      if (!response.ok) {
        throw new Error('Trip package not found');
      }
      const data = await response.json();
      setTripPackageData(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTripPackage();
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
      <Hero packageData={tripPackageData} />
      <Main packageData={tripPackageData} id={id} name={name} />
      <Footer />
    </>
  );
}

export default TripPackage;
