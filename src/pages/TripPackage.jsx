import React, { useEffect, useState } from 'react';
import './TripPackage.css';
import Hero from '../components/TripPackage/Hero';
import Main from '../components/TripPackage/Main';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './../components/General/Footer';

const TripPackage = () => {
  const { id, name } = useParams();
  const [tripPackageData, setTripPackageData] = useState([]);
  const [visitData, setVisitData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchTripPackage = async () => {
    try {

      const response = await fetch(`http://localhost:3000/api/get-trip-package/${id}`);
      if (!response.ok) {
        navigate("/error");
      }
      const data = await response.json();
      setTripPackageData(data);

      const response1 = await fetch(`http://localhost:3000/api/get-trip-package-visit/${id}`);
      if (!response1.ok) {
        navigate("/error");
      }
      const data1 = await response1.json();
      setVisitData(data1);

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
      <Main packageData={tripPackageData} id={id} name={name} visitData={visitData} />
      <Footer />
    </>
  );
}

export default TripPackage;
