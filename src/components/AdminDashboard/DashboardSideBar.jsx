import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../pages/AdminDashboard/AdminDashboard.css';

const DashboardSideBar = () => {
  const location = useLocation();
  const [isMiscOpen, setIsMiscOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMiscellaneous = () => {
    setIsMiscOpen((prev) => !prev);
  };

  const toggleServices = () => {
    setIsServicesOpen((prev) => !prev);
  };

  useEffect(() => {
    // Keep the Miscellaneous dropdown open if the current route matches one of its paths
    const miscPaths = ['/admin/dashboard/places-to-visit', '/admin/dashboard/restaurants'];
    if (miscPaths.includes(location.pathname)) {
      setIsMiscOpen(true);
    }

    // Keep the Services dropdown open if the current route matches one of its paths
    const servicePaths = ['/admin/dashboard/hotels', '/admin/dashboard/cars', '/admin/dashboard/flights'];
    if (servicePaths.includes(location.pathname)) {
      setIsServicesOpen(true);
    }
  }, [location.pathname]);

  return (
    <div className="dashboardSidebar">
      <div className="sidebarImage">
        <img src="/Uploads/MajesticTravels Logo.png" alt="Logo" />
      </div>
      <div className="dashboardItems">
        <Link to="/admin/dashboard">
          <input
            type="button"
            value="Dashboard"
            className={isActive('/admin/dashboard/') ? 'active' : ''}
          />
        </Link>
        <Link to="/admin/dashboard/Destinations">
          <input
            type="button"
            value="Destinations"
            className={isActive('/admin/dashboard/Destinations') ? 'active' : ''}
          />
        </Link>
        <Link to="/admin/dashboard/Reviews">
          <input
            type="button"
            value="Reviews"
            className={isActive('/admin/dashboard/Reviews') ? 'active' : ''}
          />
        </Link>
        <Link to="/admin/dashboard/TripPackage">
          <input
            type="button"
            value="Trip Package"
            className={isActive('/admin/dashboard/TripPackage') ? 'active' : ''}
          />
        </Link>

        <div className="servicesSection">
          <input
            type="button"
            value="Services"
            className={`dropdownToggle ${isServicesOpen ? 'open' : ''}`}
            onClick={toggleServices}
          />
          {isServicesOpen && (
            <div className="dropdownContent">
              <Link to="/admin/dashboard/hotels">
                <input
                  type="button"
                  value="Hotels"
                  className={isActive('/admin/dashboard/hotels') ? 'active' : ''}
                />
              </Link>
              <Link to="/admin/dashboard/cars">
                <input
                  type="button"
                  value="Cars"
                  className={isActive('/admin/dashboard/cars') ? 'active' : ''}
                />
              </Link>
              <Link to="/admin/dashboard/flights">
                <input
                  type="button"
                  value="Flights"
                  className={isActive('/admin/dashboard/flights') ? 'active' : ''}
                />
              </Link>
            </div>
          )}
        </div>

        {/* Miscellaneous Dropdown */}
        <div className="miscellaneousSection">
          <input
            type="button"
            value="Miscellaneous"
            className={`dropdownToggle ${isMiscOpen ? 'open' : ''}`}
            onClick={toggleMiscellaneous}
          />
          {isMiscOpen && (
            <div className="dropdownContent">
              <Link to="/admin/dashboard/places-to-visit">
                <input
                  type="button"
                  value="Places to Visit"
                  className={isActive('/admin/dashboard/places-to-visit') ? 'active' : ''}
                />
              </Link>
              <Link to="/admin/dashboard/restaurants">
                <input
                  type="button"
                  value="Restaurants"
                  className={isActive('/admin/dashboard/restaurants') ? 'active' : ''}
                />
              </Link>
            </div>
          )}
        </div>

        {/* Services Dropdown */}

      </div>
    </div>
  );
};

export default DashboardSideBar;
