import React from 'react'
import '../ReviewsDashboard/ReviewsDashboard.css'
import ReviewDashboardMain from './../../../components/ReviewsDashboard/ReviewDashboardMain';
import DashboardSideBar from './../../../components/AdminDashboard/DashboardSideBar';

const ReviewsDashboard = () => {
    return (
        <div className="displayPage">
            <DashboardSideBar />
            <ReviewDashboardMain />
        </div>
    )
}

export default ReviewsDashboard
