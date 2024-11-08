import React from 'react'
import './DestinationDashboard.css'
import DashboardSideBar from '../../../components/AdminDashboard/DashboardSideBar'
import DestinationDashboardMain from './../../../components/DestinationDashboard/DestinationDashboardMain';

const DestinationDashboard = () => {
  return (
    <>
    <div className="dashboardPage">
    <DashboardSideBar/>
    <DestinationDashboardMain/>
    </div>
    </>
  )
}

export default DestinationDashboard
