import React from 'react'
import HotelsDashboardMain from '../../../components/HotelsDashboard/HotelsDashboardMain'
import DashboardSideBar from '../../../components/AdminDashboard/DashboardSideBar'

const HotelsDashboard = () => {
    return (
        <div className="displayPage">
            <DashboardSideBar />
            <HotelsDashboardMain />
        </div>
    )
}

export default HotelsDashboard
