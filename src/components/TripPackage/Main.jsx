import React from 'react'
import '../../pages/TripPackage.css'
import HotelSection from './HotelSection'
import TripImageBox from './TripImageBox'
import RedDivider from './RedDivider'
import VisitingLocations from './VisitingLocations'
import Transportation from './Transportation'
import OtherInfo from './OtherInfo'
import Ratings from './Ratings'
import WriteReview from './WriteReview'

const Main = ({ packageData }) => {
  return (
    <>
      <main>
        <HotelSection packageData={packageData} />
        <RedDivider />
        <h3 id='placesVisitingh3'>Places you will be visiting:</h3>
        <VisitingLocations num="1" packageData={packageData} />
        <VisitingLocations num="2" />
        <VisitingLocations num="3" />
        <VisitingLocations num="4" last={true} />
        <RedDivider />
        <Transportation />
        <RedDivider />
        <OtherInfo />
        <RedDivider />
        <Ratings />
        <RedDivider />
        <WriteReview />
      </main>
    </>
  )
}

export default Main
