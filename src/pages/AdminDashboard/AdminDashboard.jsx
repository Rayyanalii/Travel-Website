import React from 'react'
import DashboardSideBar from './../../components/AdminDashboard/DashboardSideBar';
import DashboardMainContent from './../../components/AdminDashboard/DashboardMainContent';
import '../../pages/AdminDashboard/AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <>
    <div className="dashboardPage">
    <DashboardSideBar/>
    <DashboardMainContent/>
    </div>
    </>
  )
}

export default AdminDashboard
