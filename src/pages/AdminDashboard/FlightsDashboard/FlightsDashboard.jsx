import React from 'react'
import DashboardSideBar from '../../../components/AdminDashboard/DashboardSideBar'
import FlightsDashboardMain from '../../../components/FlightsDashboard/FlightsDashboardMain'

const FlightsDashboard = () => {
    return (
        <div className="dashboardPage">
            <DashboardSideBar />
            <FlightsDashboardMain />
        </div>
    )
}

export default FlightsDashboard
