import React from 'react'
import '../../pages/Destinations.css'
import Navbar from '../Navbar'

const Hero = () => {
  return (
    <>
      <header>
        <Navbar />
        <div className="destImage">
          <img className="destinationImage" src="/Uploads/HomePageBackground.png" alt="" />
        </div>
        <div className="destinationHeadingText">
          <h1>Destinations</h1>
        </div>
      </header>
    </>
  )
}

export default Hero
