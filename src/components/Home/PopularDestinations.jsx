import React from 'react'
import '../../pages/Home.css'
import DestinationCard from '../Destinations/DestinationCard'

const PopularDestinations = () => {
  return (
    <>
    <div className="destinationText">
          <h2>Popular Destinations</h2>
          <p>World's best tourist city destinations</p>
        </div>
        <div className="destinationCards">
          <DestinationCard name="Tokyo" imageUrl="src\assets\TokyoDestinationCard.png" url="/Destinations/Tokyo"/>
          <DestinationCard name="Paris" imageUrl="src\assets\ParisDestinationCard.png" url="/Destinations/Paris"/>
          <DestinationCard name="Skardu" imageUrl="src\assets\SkarduDestinationCard.png" url="/Destinations/Skardu"/>
          <DestinationCard name="London" imageUrl="src\assets\LondonDestinationCard.png" url="/Destinations/London"/>
        </div>
    </>
  )
}

export default PopularDestinations
