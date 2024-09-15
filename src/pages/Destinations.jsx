import React from 'react'
import './Destinations.css'
import Navbar from '../components/Navbar'
import DestinationCard from '../components/DestinationCard'

const Destinations = () => {
  return (
    <>
    <Navbar/>
    <header>
      <div className="destImage">
        <img className="destinationImage"src="src\assets\DestinationBackgroundImage.png" alt="" />
      </div>
      <div className="destinationHeadingText">
        <h1>Destinations</h1>
      </div>
    </header>
    <main>
      <div className="allDestinationCards">
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
        <DestinationCard url="src\assets\SkarduDestinationCard.png" name="Skardu"/>
      </div>
    </main>
    <footer>
      <div className="footers"></div>
    </footer>
    </>
  )
}

export default Destinations
