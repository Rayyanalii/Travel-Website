import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const HotelSection = () => {
  return (
    <>
        <div className="hotelSection">
            <h3>Hotel:</h3>
            <div className="hotelNameContainer"><img src='src\assets\LondonDestinationCard.png'></img><h4>Hotel Name</h4></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis itaque sed iusto? Ipsa molestias quam a ut cum mollitia dolore sequi quisquam id, fuga, neque laboriosam esse temporibus. Nobis, libero.</p>
            <TripImageBox hotel={true}/>
        </div>
    </>
  )
}

export default HotelSection
