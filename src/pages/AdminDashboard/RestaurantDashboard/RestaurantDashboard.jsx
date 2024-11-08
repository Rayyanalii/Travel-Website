import React from 'react'
import DashboardSideBar from './../../../components/AdminDashboard/DashboardSideBar';
import RestaurantDashboardMain from '../../../components/RestaurantDashboard/RestaurantDashboardMain';

const ReviewsDashboard = () => {
    return (
        <div className="displayPage">
            <DashboardSideBar />
            <RestaurantDashboardMain />
        </div>
    )
}

export default ReviewsDashboard
