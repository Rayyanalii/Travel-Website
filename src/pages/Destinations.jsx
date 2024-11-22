import React from 'react';
import './Destinations.css';
import Hero from '../components/Destinations/Hero';
import Main from '../components/Destinations/Main';
import Navbar from '../components/Navbar';
import Footer from './../components/General/Footer';

const Destinations = () => {
  return (
    <>
      <div className="destinationsPage">
        <Navbar />
        <Hero />
        <Main />
      </div>
      <Footer />
    </>
  );
};

export default Destinations;
