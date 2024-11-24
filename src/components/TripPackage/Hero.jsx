import React from 'react'
import '../../pages/TripPackage.css'

import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/Auth/AuthContext';



const TripPackageHero = ({ packageData }) => {

  const { loggedIn } = useAuth();

  const navigate = useNavigate();

  function handlePrice() {
    if (loggedIn) {
      navigate("/tripPackage/payment", { state: { tripDetails: packageData[0] } });
    }
    else {
      alert("You Need To Login To Book A Trip Package")
    }
  }

  return (
    <>
      <header>

        <div className="tripPackageImageContainer">
          <img src={packageData[0].IMAGE} alt="Trip Image" />
          <h1>{packageData[0].TITLE}</h1>
          <div className="tripPackagePriceContainer">
            <p className='tripPackagePriceText'>${packageData[0].PRICE}</p>
            <button onClick={handlePrice} className='tripPackageBookNowButton'>Book Now</button>
          </div>
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
            <div style={{ width: "1%" }}>
              .
            </div>

          </div>
        </div>
      </header>

    </>
  )
}

export default TripPackageHero
