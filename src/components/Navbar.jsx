import React from 'react'
import './Navbar.css'
import Destinations from '../pages/Destinations'

const Navbar = () => {
  return (
    <>
    <nav className="navbar-container">
      <div className="container">
        <div className="logo">
          <a href="/"><img src="src\assets\MajesticTravels Logo.png" alt="Logo" /></a>
        </div>
        <div className="rightSide">
        <div className="links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/">Pages</a></li>
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

    </nav>
    </>
  )
}

export default Navbar
