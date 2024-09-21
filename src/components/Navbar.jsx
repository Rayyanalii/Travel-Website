import React from 'react'
import './Navbar.css'
import Destinations from '../pages/Destinations'
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [hamburger, sethamburger] = useState(false);
  const [serviceDrop, setserviceDrop] = useState(false);

  function openHamburger() {
    sethamburger(!hamburger);
  }

  function openservice() {
    setserviceDrop(!serviceDrop);
  }


  return (
    <>
      <nav className="navbar-container">
        <div className="container">
          <div className="logo">
            <Link to="/"><img src="src\assets\MajesticTravels Logo.png" alt="Logo" /></Link>
          </div>
          <div className="rightSide">
            <div className="links">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/destinations">Destinations</Link></li>
                <li className='service'>
                  <Link to="/" onClick={openservice}>Services</Link>
                  <div className={serviceDrop ? "serviceDropdown" : "closedServiceDropdown"}>
                    Hello
                  </div>
                </li>
                <li><Link to="/">Pages</Link></li>
              </ul>
            </div>
            <div className="verticalLine">
              |
            </div>
            <div className="buttons">
              <button className="mainButtons" id="loginButton">Login</button>
              <button className="mainButtons" id="signupButton">Signup</button>
            </div>
          </div>
        </div>

        <div className="mobileContainer">
          <div className="hamburgerIconContainer">
            <GiHamburgerMenu className="hamburger" onClick={openHamburger} />
          </div>
          <div className="mobileLogo">
            <a href="/"><img src="src\assets\MajesticTravels Logo.png" alt="Logo" /></a>
          </div>
        </div>
        <div className={hamburger ? "sliderMenuContainer" : "closedSlider"}>
          <ul>
            <li className='menuListItems'>Home</li>
            <li className='menuListItems'>Destination</li>
            <li className='menuListItems'>Services</li>
            <li className='menuListItems'>Pages</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
