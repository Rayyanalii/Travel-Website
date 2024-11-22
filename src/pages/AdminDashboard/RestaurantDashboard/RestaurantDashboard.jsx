import React, { useEffect } from 'react'
import DashboardSideBar from './../../../components/AdminDashboard/DashboardSideBar';
import RestaurantDashboardMain from '../../../components/RestaurantDashboard/RestaurantDashboardMain';
import { useNavigate } from 'react-router-dom';


const ReviewsDashboard = () => {
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
        <div className="displayPage">
            <DashboardSideBar />
            <RestaurantDashboardMain />
        </div>
    )
}

export default ReviewsDashboard
