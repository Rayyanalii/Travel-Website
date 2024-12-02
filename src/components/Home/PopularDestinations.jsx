import React from 'react'
import '../../pages/Home.css'
import DestinationCard from './../Destinations/DestinationCard';
import { useState } from 'react';
import { useEffect } from 'react';


const PopularDestinations = () => {

  const [card, setCard] = useState([]);



  const fetchDestinationCard = async () => {
    try {

      const response = await fetch('http://localhost:3000/api/get-destination-card'); // Fetch data from the endpoint

      if (!response.ok) {
        throw new Error('No Destination found'); // Handle errors if the response is not ok
      }

      const data = await response.json(); // Parse the response JSON

      setCard(data); // Set the data in state


    } catch (error) {
      console.error("No Destination Found");

    }
  };

  useEffect(() => {
    fetchDestinationCard();

  }, []);

  return (
    <>
      <div className="destinationText">
        <h2>Popular Destinations</h2>
        <p>World's best tourist city destinations</p>
      </div>
      <div className="destinationCards">
        {card && card.map((dest, index) => (
          <DestinationCard key={index} url={`/Destinations/${dest.DESTINATIONID}/${dest.CITY}`} imageUrl={dest.IMAGES.split(",")[0]} name={dest.CITY} />
        ))}
        {card.length == 0 && <p>No Destinations Found</p>}
      </div>
    </>
  )
}

export default PopularDestinations
