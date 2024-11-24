import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Modal from "./Model/Modal";
import Login from './../pages/Auth/Login';
import Signup from './../pages/Auth/Signup';
import { useAuth } from '../pages/Auth/AuthContext';


const Navbar = () => {
  const { loggedIn, logout, login } = useAuth();
  const [hamburger, setHamburger] = useState(false);
  const [serviceDrop, setServiceDrop] = useState(false);
  const [pagesDrop, setPagesDrop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openLoginModal = () => {

    setModalContent("login");
    setIsModalOpen(true);

  };

  const openSignupModal = () => {

    setModalContent("signup");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  function toggleHamburger() {
    setHamburger(!hamburger);
    console.log(!hamburger);
  }

  function closeHamburger() {
    setHamburger(false);
  }

  function toggleService() {
    setServiceDrop(!serviceDrop);
    console.log(!serviceDrop);
  }

  function togglePages() {
    setPagesDrop(!pagesDrop);
  }

  function handleLogout() {
    localStorage.clear();
    logout();
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !document.querySelector(".service a").contains(e.target) &&
        serviceDrop
      ) {
        setServiceDrop(false);
      }
      if (!document.querySelector(".pages a").contains(e.target) && pagesDrop) {
        setPagesDrop(false);
      }
      if (
        !document.querySelector(".hamburger").contains(e.target) &&
        hamburger
      ) {
        closeHamburger();
      }
    };


    if (localStorage.getItem('email')) {
      login();
    }



    document.addEventListener("mouseup", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [serviceDrop, pagesDrop, hamburger, isModalOpen]);

  return (
    <>
      <nav className="navbar-container">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/Uploads/MajesticTravels Logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="rightSide">
            <div className="links">
              <ul>
                <li className="navbarLinks">
                  <Link to="/">Home</Link>
                </li>
                <li className="navbarLinks">
                  <Link to="/Destinations">Destinations</Link>
                </li>
                <li className="service navbarLinks">
                  <Link
                    to=""
                    onClick={() => {
                      setPagesDrop(false);
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
                          <Link to="/ServiceCar">Rent A Car</Link>
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
                      setServiceDrop(false);
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
                          <Link to="/reviews">Reviews</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="verticalLine">|</div>
            {!loggedIn && <div className="buttons">
              <button className="mainButtons" id="loginButton" onClick={openLoginModal}>
                Login
              </button>
              <button className="mainButtons" id="signupButton" onClick={openSignupModal}>
                Signup
              </button>
            </div>}
            {loggedIn && <div className="navbarUsernameContainer">
              <div className="navbarUsernameContent">
                <img src="/Uploads/EiffelTower1.jpg" alt="User" />
                <p>{localStorage.getItem('username')}</p>
              </div>
              <div className="navbarLogoutContainer">
                <button className="navbarlogout" onClick={handleLogout}>Logout</button>
              </div>
            </div>}

          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="mobileContainer">
          <div className="hamburgerIconContainer">
            <GiHamburgerMenu className="hamburger" onClick={toggleHamburger} />
          </div>
          <div className="mobileLogo">
            <Link to="/">
              <img src="src/assets/MajesticTravels Logo.png" alt="Logo" />
            </Link>
          </div>
        </div>

        {/* Mobile Slider Menu */}
        <div className={hamburger ? "sliderMenuContainer" : "closedSlider"}>
          <ul>
            <li className="menuListItems">
              <Link to="/" onClick={closeHamburger}>
                Home
              </Link>
            </li>
            <li className="menuListItems">
              <Link to="/destinations" onClick={closeHamburger}>
                Destinations
              </Link>
            </li>
            <li className="mobileDropdown">
              <span onClick={toggleService}>Services</span>
              {serviceDrop && (
                <ul>
                  <li>
                    <Link to="/ServiceCar" onClick={closeHamburger}>
                      Rent A Car
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceFlight" onClick={closeHamburger}>
                      Book A Flight
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceHotel" onClick={closeHamburger}>
                      Book A Hotel
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mobileDropdown">
              <span onClick={togglePages}>Pages</span>
              {pagesDrop && (
                <ul>
                  <li>
                    <Link to="/reviews" onClick={closeHamburger}>
                      Reviews
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mobileMenuButtons">
              <button
                className="mainButtons"
                id="loginButton"
                onClick={openLoginModal}
              >
                Login
              </button>
              <button
                className="mainButtons"
                id="signupButton"
                onClick={openSignupModal}
              >
                Signup
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <Modal show={isModalOpen} onClose={closeModal}>
        {modalContent === "login" ? (
          <Login closeModal={setIsModalOpen} setModal={setModalContent} />
        ) : (
          <Signup closeModal={setIsModalOpen} setModal={setModalContent} />
        )}
      </Modal>
    </>
  );
};

export default Navbar;
