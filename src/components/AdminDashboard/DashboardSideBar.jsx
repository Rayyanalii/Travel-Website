import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../pages/AdminDashboard/AdminDashboard.css';
import { useAuth } from '../../pages/Auth/AuthContext';



const DashboardSideBar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
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

  function handleLogout() {
    sessionStorage.clear();
    logout();
    navigate('/admin');
  }

  useEffect(() => {
    const miscPaths = ['/admin/dashboard/places-to-visit', '/admin/dashboard/restaurants'];
    if (miscPaths.includes(location.pathname)) {
      setIsMiscOpen(true);
    }

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
            className={isActive('/admin/dashboard/') ? 'active' : 'inactive'}
          />
        </Link>
        <Link to="/admin/dashboard/Destinations">
          <input
            type="button"
            value="Destinations"
            className={isActive('/admin/dashboard/Destinations') ? 'active' : 'inactive'}
          />
        </Link>
        <Link to="/admin/dashboard/Reviews">
          <input
            type="button"
            value="Reviews"
            className={isActive('/admin/dashboard/Reviews') ? 'active' : 'inactive'}
          />
        </Link>
        <Link to="/admin/dashboard/TripPackage">
          <input
            type="button"
            value="Trip Package"
            className={isActive('/admin/dashboard/TripPackage') ? 'active' : 'inactive'}
          />
        </Link>

        <div className="servicesSection">
          <input
            type="button"
            value="Services"
            className={`dropdownToggle ${isServicesOpen ? 'open' : 'inactive'}`}
            onClick={toggleServices}
          />
          {isServicesOpen && (
            <div className="dropdownContent">
              <Link to="/admin/dashboard/hotels">
                <input
                  type="button"
                  value="Hotels"
                  className={isActive('/admin/dashboard/hotels') ? 'active' : 'inactive'}
                />
              </Link>
              <Link to="/admin/dashboard/cars">
                <input
                  type="button"
                  value="Cars"
                  className={isActive('/admin/dashboard/cars') ? 'active' : 'inactive'}
                />
              </Link>
              <Link to="/admin/dashboard/flights">
                <input
                  type="button"
                  value="Flights"
                  className={isActive('/admin/dashboard/flights') ? 'active' : 'inactive'}
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
            className={`dropdownToggle ${isMiscOpen ? 'open' : 'inactive'}`}
            onClick={toggleMiscellaneous}
          />
          {isMiscOpen && (
            <div className="dropdownContent">
              <Link to="/admin/dashboard/places-to-visit">
                <input
                  type="button"
                  value="Places to Visit"
                  className={isActive('/admin/dashboard/places-to-visit') ? 'active' : 'inactive'}
                />
              </Link>
              <Link to="/admin/dashboard/restaurants">
                <input
                  type="button"
                  value="Restaurants"
                  className={isActive('/admin/dashboard/restaurants') ? 'active' : 'inactive'}
                />
              </Link>
            </div>
          )}

        </div>

        <input
          type="button"
          value="Logout"
          className='inactive'
          onClick={handleLogout}
        />


      </div>
    </div>
  );
};

export default DashboardSideBar;
