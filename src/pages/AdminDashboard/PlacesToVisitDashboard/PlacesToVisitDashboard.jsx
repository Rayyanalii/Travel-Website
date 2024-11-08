import React from 'react'
import PlacesToVisitDashboardMain from '../../../components/PlacesToVisitDashboard/PlacesToVisitDashboardMain'
import DashboardSideBar from '../../../components/AdminDashboard/DashboardSideBar'

const PlacesToVisitDashboard = () => {
    return (
        <div className="displayPage">
            <DashboardSideBar />
            <PlacesToVisitDashboardMain />
        </div>
    )
}

export default PlacesToVisitDashboard
