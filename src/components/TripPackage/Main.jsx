import React from 'react'
import '../../pages/TripPackage.css'
import HotelSection from './HotelSection'
import TripImageBox from './TripImageBox'
import RedDivider from './RedDivider'
import VisitingLocations from './VisitingLocations'
import Transportation from './Transportation'
import OtherInfo from './OtherInfo'

const Main = () => {
  return (
    <>
    <main>
        <HotelSection/>
        <RedDivider/>
        <h3 id='placesVisitingh3'>Places you will be visiting:</h3>
        <VisitingLocations num="1"/>
        <VisitingLocations num="2"/>
        <VisitingLocations num="3"/>
        <VisitingLocations num="4" last={true}/>
        <RedDivider/>
        <Transportation/>
        <RedDivider/>
        <OtherInfo/>
    </main>
    </>
  )
}

export default Main
