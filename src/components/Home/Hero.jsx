import React from 'react'

import RedButton from '../RedButton'
import SearchBar from '../SearchBar'
import '../../pages/Home.css'
import { useState } from 'react'

const Hero = () => {
  const [searched, setsearched] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <header>
        <div className="images">
          <img className="backImage" src="/Uploads/GradientBackgroundHomePage.png" alt="" />
        </div>
        <div className="headingText">
          <h1>Where do you want to go?</h1>
          <p>Trips, experiences, and places. All in one service.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="searchForm">
            <div className="search">
              <SearchBar setsearched={setsearched} />
            </div>
            <div className="searchButton">
              <RedButton type="submit" review={false} desc="Go!" />
            </div>
          </div>
        </form>
      </header>
    </>
  )
}

export default Hero
