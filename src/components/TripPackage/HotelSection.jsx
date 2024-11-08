import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const HotelSection = ({ packageData }) => {
  return (
    <>
      <div className="hotelSection">
        <h3>Hotel:</h3>
        <div className="hotelNameContainer"><img src='src\assets\LondonDestinationCard.png'></img><h4>{packageData.hotelTitle}</h4></div>
        <p>{packageData.hotelDescription}</p>
        <TripImageBox hotel={true} />
      </div>
    </>
  )
}

export default HotelSection
