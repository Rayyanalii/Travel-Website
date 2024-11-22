import React, { useEffect } from 'react'
import './DestinationDashboard.css'
import DashboardSideBar from '../../../components/AdminDashboard/DashboardSideBar'
import DestinationDashboardMain from './../../../components/DestinationDashboard/DestinationDashboardMain';
import { useNavigate } from 'react-router-dom';



const DestinationDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("username") == null || sessionStorage.getItem("role") == null) {

      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    }
  }, []);

  if (sessionStorage.getItem("username") == null || sessionStorage.getItem("role") == null) {
    return <>
      <p>Session Expired. Sending you to login page...</p>
    </>
  }
  return (
    <>
      <div className="dashboardPage">
        <DashboardSideBar />
        <DestinationDashboardMain />
      </div>
    </>
  )
}

export default DestinationDashboard
