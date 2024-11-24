import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footerMainContainer">
        <div className="footerPartition">
          <h3>Stay connected with us!</h3>
          <input type="text" name="email" id="email" placeholder="Email Address" />
          <input type="submit" value="Subscribe" className="footerredbutton" />
        </div>
        <div className="footerPartition">
          <div className="FooterSitemapAndServicesContainer">
            <div className="FooterSitemapAndServicesText">
              <h3>Sitemap</h3>
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/destinations" className="footer-link">
                Destinations
              </Link>
              <Link to="/about" className="footer-link">
                About
              </Link>
              <Link to="/reviews" className="footer-link">
                Reviews
              </Link>
              <Link to="/gallery" className="footer-link">
                Gallery
              </Link>
            </div>
            <div className="FooterSitemapAndServicesText">
              <h3>Services</h3>
              <Link to="/ServiceCar" className="footer-link">
                Rent a car
              </Link>
              <Link to="/ServiceFlight" className="footer-link">
                Book a flight
              </Link>
              <Link to="/ServiceHotel" className="footer-link">
                Book a hotel
              </Link>
            </div>
          </div>
        </div>
        <div className="footerPartition">
          <div className="FooterSocialHeading">
            <h3>Follow our Socials</h3>
          </div>
          <div className="FooterSocialLogos">
            <img src="/Uploads/facebookLogo.png" alt="Facebook Logo" />
            <img src="/Uploads/instaLogo.png" alt="Insta Logo" />
            <img src="/Uploads/twitterLogo.png" alt="Twitter Logo" />
          </div>
        </div>
        <div className="footerCopywriteContainer">
          <p>
            | &copy; {new Date().getFullYear()} Majestic Travels | All rights
            reserved |
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
