import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const HotelSection = ({ packageData }) => {

  const hotelImagesURL = packageData.length > 0 ? packageData[0].HOTELIMAGES.split(",") : null
  return (
    <>
      <div className="hotelSection">
        <h3>Hotel:</h3>
        {packageData.length > 0 && <><div className="hotelNameContainer"><img src={packageData[0].HOTELLOGO}></img><h4>{packageData[0].HOTELNAME}</h4></div>
          <p>{packageData[0].HOTELDESCRIPTION}</p>
          <TripImageBox url={hotelImagesURL} hotel={true} /></>}
        {packageData.length == 0 && <p>No Hotels Found</p>}

      </div>
    </>
  )
}

export default HotelSection
