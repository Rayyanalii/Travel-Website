import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState(false)
  const [isSending, setisSending] = useState(false)

  const handleSubscribe = async (e) => {
    setisSending(true)
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify({ email }), // Send email as JSON
      });
      if (response.ok) {
        setEmail("");
        setisSending(false)
        setmessage(true)
        setTimeout(() => {
          setmessage(false);
        }, 3000);
      }
      setEmail("");
    } catch (error) {
    }
  };


  return (
    <footer>
      <div className="footerMainContainer">
        <div className="footerPartition">
          <h3>Stay connected with us!</h3>
          <form onSubmit={handleSubscribe} className="footerForm">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email Address"
              required
              className="footerEmailInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSending && <input
              type="submit"
              value="Sending..."
              className="footerredbuttonSending"
              disabled
            />}
            {message && <input
              type="submit"
              value="Subscribed!"
              className="footergreenbutton"
              disabled
            />}
            {!message && !isSending && <input
              type="submit"
              value="Subscribe"
              className="footerredbutton"
            />}
          </form>

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
            <img src="/facebookLogo.png" alt="Facebook Logo" />
            <img src="/instaLogo.png" alt="Insta Logo" />
            <img src="/twitterLogo.png" alt="Twitter Logo" />
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
