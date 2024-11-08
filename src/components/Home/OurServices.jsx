import React from 'react'
import '../../pages/Home.css'
import ServiceCard from '../ServiceCard'

const OurServices = () => {
  return (
    <>
    <div className="servicesText">
          <h2>Our Services</h2>
        </div>
        <div className="allServices">
          <ServiceCard title="Rent A Car" desc="Choose from our finest car rentals choices" iden="car"/>
          <ServiceCard title="Book A Flight" desc="Travel in the finest airlines business class" iden="plane"/>
          <ServiceCard title="Book A Hotel" desc="Luxurious and affordable hotels available for you" iden="hotel"/>
        </div>
    </>
  )
}

export default OurServices
