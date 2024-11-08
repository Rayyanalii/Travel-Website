import React, { useEffect } from "react";
import "./Navbar.css";
import Destinations from "../pages/Destinations";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [hamburger, sethamburger] = useState(false);
  const [serviceDrop, setserviceDrop] = useState(false);
  const [pagesDrop, setpagesDrop] = useState(false);

  function toggleHamburger() {
    sethamburger(!hamburger);
  }
  function closeHamburger() {
    sethamburger(false);
  }

  function toggleService() {
    setserviceDrop(!serviceDrop);
  }

  function closeService() {
    setserviceDrop(false);
  }

  function togglePages() {
    setpagesDrop(!pagesDrop);
  }

  function closePages() {
    setpagesDrop(false);
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !document.querySelector(".service a").contains(e.target) &&
        serviceDrop
      ) {
        closeService();
      }
      if (!document.querySelector(".pages a").contains(e.target) && pagesDrop) {
        closePages();
      }
      if (
        !document.querySelector(".hamburger").contains(e.target) &&
        hamburger
      ) {
        closeHamburger();
      }
    };

    document.addEventListener("mouseup", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [serviceDrop, pagesDrop, hamburger]);

  return (
    <>
      <nav className="navbar-container">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="src\assets\MajesticTravels Logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="rightSide">
            <div className="links">
              <ul>
                <li className="navbarLinks">
                  <Link to="/">Home</Link>
                </li>
                <li className="navbarLinks">
                  <Link to="/destinations">Destinations</Link>
                </li>
                <li className="service navbarLinks">
                  <Link
                    to=""
                    onClick={() => {
                      closePages();
                      toggleService();
                    }}
                  >
                    Services
                  </Link>
                  <div
                    className={
                      serviceDrop ? "serviceDropdown" : "closedServiceDropdown"
                    }
                  >
                    <div className="serviceDropdownList">
                      <ul>
                        <li>
                          <Link to="/">Rent A Car</Link>
                        </li>
                        <li>
                          <Link to="/ServiceFlight">Book A Flight</Link>
                        </li>
                        <li>
                          <Link to="/ServiceHotel">Book A Hotel</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="pages navbarLinks">
                  <Link
                    to=""
                    onClick={() => {
                      closeService();
                      togglePages();
                    }}
                  >
                    Pages
                  </Link>
                  <div
                    className={
                      pagesDrop ? "pagesDropdown" : "closedPagesDropdown"
                    }
                  >
                    <div className="pagesDropdownList">
                      <ul>
                        <li>
                          <Link to="/">Reviews</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="verticalLine">|</div>
            <div className="buttons">
              <button className="mainButtons" id="loginButton">
                Login
              </button>
              <button className="mainButtons" id="signupButton">
                Signup
              </button>
            </div>
          </div>
        </div>

        <div className="mobileContainer">
          <div className="hamburgerIconContainer">
            <GiHamburgerMenu className="hamburger" onClick={toggleHamburger} />
          </div>
          <div className="mobileLogo">
            <a href="/">
              <img src="src\assets\MajesticTravels Logo.png" alt="Logo" />
            </a>
          </div>
        </div>
        <div className={hamburger ? "sliderMenuContainer" : "closedSlider"}>
          <ul>
            <li className="menuListItems">
              <Link to="/">Home</Link>
            </li>
            <li className="menuListItems">
              <Link to="/destinations">Destination</Link>
            </li>
            <li className="menuListItems">
              <Link to="">Services</Link>
            </li>
            <li className="menuListItems">
              <Link to="">Pages</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
