import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const HotelSection = ({ packageData }) => {
  console.log(packageData);


  const hotelImagesURL = packageData[0].HOTELIMAGES.split(",");
  return (
    <>
      <div className="hotelSection">
        <h3>Hotel:</h3>
        <div className="hotelNameContainer"><img src={packageData[0].HOTELLOGO}></img><h4>{packageData[0].HOTELNAME}</h4></div>
        <p>{packageData[0].HOTELDESCRIPTION}</p>
        <TripImageBox url={hotelImagesURL} hotel={true} />
      </div>
    </>
  )
}

export default HotelSection
