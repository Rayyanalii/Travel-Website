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

const Main = ({ packageData, id, name, visitData }) => {

  return (
    <>
      <main>
        <HotelSection packageData={packageData} />
        <RedDivider />
        <h3 id='placesVisitingh3'>Places you will be visiting:</h3>
        {visitData.length > 0 && visitData.map((place, index) => (
          <VisitingLocations key={index} num={index + 1} packageData={place} last={index == visitData.length ? false : true} />
        ))}
        {packageData.length == 0 && <p>No Places Found</p>}

        <RedDivider />
        <Ratings packageData={packageData} />
        <RedDivider />
        <WriteReview id={id} name={name} />
      </main>
    </>
  )
}

export default Main
