import React from 'react'
import '../../pages/TripPackage.css'
import Navbar from '../Navbar'
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";

const TripPackageHero = () => {
  return (
    <>
    <header>
       <Navbar/>
       <div className="tripPackageImageContainer">
        <img src="src\assets\parisTripPackageImage.png" alt="Trip Image" />
        <h1>French Fever</h1>
       </div>
       <div className="tripPackageDescriptionCardsContainer">
            <div>
            <GoClock className='tripPackageClockIcon'/>
            <p>6 days</p>
            </div>
            <div>
            <CiCalendar className='tripPackageCalendarIcon'/>
            <p>All year</p>
            </div>
            <div>
            <FaRegAddressCard className='tripPackageIDIcon'/>
            <p>Age 12+</p>
            </div>
        </div>
    </header>

    </>
  )
}

export default TripPackageHero
