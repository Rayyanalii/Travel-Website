import React from 'react'
import PopularDestinations from './PopularDestinations'
import ValueTrips from './ValueTrips'
import '../../pages/Home.css'
import OurServices from './OurServices'

const Main = () => {
  return (
    <>
    <main>
        <PopularDestinations/>
        <ValueTrips/>
        <OurServices/>
    </main>
    </>
  )
}

export default Main
