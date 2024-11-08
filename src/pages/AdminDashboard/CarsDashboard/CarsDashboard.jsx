import React from 'react'
import DashboardSideBar from './../../../components/AdminDashboard/DashboardSideBar';
import CarsDashboardMain from '../../../components/CarsDashboard/CarsDashboardMain';

const CarsDashboard = () => {
    return (
        <div className="displayPage">
            <DashboardSideBar />
            <CarsDashboardMain />
        </div>
    )
}

export default CarsDashboard
