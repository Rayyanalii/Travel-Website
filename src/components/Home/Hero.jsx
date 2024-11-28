import React, { useEffect } from 'react'

import RedButton from '../RedButton'
import SearchBar from '../SearchBar'
import '../../pages/Home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Hero = () => {
  const navigate = useNavigate();
  const [searched, setsearched] = useState("")
  const [searchedID, setsearchedID] = useState("")
  const [error, seterror] = useState("")

  const [destinations, setdestinations] = useState([]);
  const [filteredDestinations, setfilteredDestinations] = useState([]);

  const [clickedCity, setclickedCity] = useState([])

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get-destinations');
      const data = await response.json();
      setdestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  useEffect(() => {
    fetchDestinations();

  }, [])

  useEffect(() => {
    const filteredDestinations = destinations.filter(
      (dest) => {
        return (
          searched &&
          (dest.CITY.toLowerCase().includes(searched.toLowerCase()) ||
            dest.COUNTRY.toLowerCase().includes(searched.toLowerCase()))
        )
      }
    );
    setfilteredDestinations(filteredDestinations);

  }, [searched])

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchedID || searchedID == "") {
      seterror("Choose a destination first")
    }
    if (clickedCity && searchedID) {
      navigate(`/Destinations/${searchedID}/${clickedCity.CITY}`);
    }
  }

  function handleSearchClick(id) {
    const dest = destinations.find((dest) => dest.DESTINATIONID === id);
    setclickedCity(dest)
    const string = `${dest.COUNTRY}, ${dest.CITY}`;
    setsearched(string);
    setfilteredDestinations([])
    setsearchedID(id)
    seterror("")
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
              <SearchBar setsearched={setsearched} defaultValue={searched} setID={setsearchedID} seterror={seterror} />

              {error && <p style={{ marginTop: "5px" }}>{error}</p>}
              {filteredDestinations.length > 0 && <div className="homePageSearchResults">
                {filteredDestinations.map((dest, index) => {
                  return (
                    <div key={index} onClick={() => handleSearchClick(dest.DESTINATIONID)} style={{ cursor: "pointer" }}>
                      <p>{dest.COUNTRY}, {dest.CITY}</p>
                      <div className="searchResultDivider"></div>
                    </div>
                  )
                })}

              </div>}
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
