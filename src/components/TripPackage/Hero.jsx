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
          <img src={packageData.packageURL} alt="Trip Image" />
          <h1>{packageData.packageTitle}</h1>
          <div className="tripPackageDescriptionCardsContainer">
            <div>
              <GoClock className='tripPackageClockIcon' />
              <p>{packageData.packageDuration}</p>
            </div>
            <div>
              <CiCalendar className='tripPackageCalendarIcon' />
              <p>{packageData.packageAvailability}</p>
            </div>
            <div>
              <FaRegAddressCard className='tripPackageIDIcon' />
              <p>{packageData.packageReq}</p>
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default TripPackageHero
