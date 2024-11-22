import React, { useEffect } from 'react'
import DashboardSideBar from './../../components/AdminDashboard/DashboardSideBar';
import DashboardMainContent from './../../components/AdminDashboard/DashboardMainContent';
import '../../pages/AdminDashboard/AdminDashboard.css'
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
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
        <DashboardMainContent />
      </div>
    </>
  )
}

export default AdminDashboard
