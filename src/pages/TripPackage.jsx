import React from 'react'
import './TripPackage.css'
import Navbar from '../components/Navbar'
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";

const TripPackage = () => {
  return (
    <>
    <header>
       <Navbar/>
       <div className="tripPackageImageContainer">
        <img src="src\assets\parisTripPackageImage.png" alt="Trip Image" />
        <h1>French Fever</h1>
        <div className="tripPackageDescriptionCardsContainer">
            <div>
            <GoClock className='tripPackageClockIcon'/>
            <p>6 days</p>
            </div>
            <div>
            <CiCalendar className='tripPackageCalendarIcon'/>
            <p>6 days</p>
            </div>
        </div>
       </div>
    </header>
    </>
  )
}

export default TripPackage
