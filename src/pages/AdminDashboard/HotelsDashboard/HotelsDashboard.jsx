import React, { useEffect } from 'react'
import HotelsDashboardMain from '../../../components/HotelsDashboard/HotelsDashboardMain'
import DashboardSideBar from '../../../components/AdminDashboard/DashboardSideBar'
import { useNavigate } from 'react-router-dom'


const HotelsDashboard = () => {
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
            <HotelsDashboardMain />
        </div>
    )
}

export default HotelsDashboard
