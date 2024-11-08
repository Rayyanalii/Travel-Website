import React from 'react'
import TripPackageDashboardMain from './../../../components/TripPackageDashboard/TripPackageDashboardMain';
import DashboardSideBar from './../../../components/AdminDashboard/DashboardSideBar';

const TripPackageDashboard = () => {
    return (
        <div className="displayPage">
            <DashboardSideBar />
            <TripPackageDashboardMain />
        </div>
    )
}

export default TripPackageDashboard
