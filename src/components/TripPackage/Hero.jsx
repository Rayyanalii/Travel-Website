import React from 'react'
import '../../pages/TripPackage.css'

import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";

const TripPackageHero = ({ packageData }) => {

  return (
    <>
      <header>

        <div className="tripPackageImageContainer">
          <img src={packageData[0].IMAGE} alt="Trip Image" />
          <h1>{packageData[0].TITLE}</h1>
          <div className="tripPackageDescriptionCardsContainer">
            <div>
              <GoClock className='tripPackageClockIcon' />
              <p>{packageData[0].PACKAGEDURATION} days</p>
            </div>
            <div>
              <CiCalendar className='tripPackageCalendarIcon' />
              <p>{packageData[0].PACKAGEAVAILABILITY}</p>
            </div>
            <div>
              <FaRegAddressCard className='tripPackageIDIcon' />
              <p>{packageData[0].PACKAGEREQUIREMENT} Person</p>
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default TripPackageHero
