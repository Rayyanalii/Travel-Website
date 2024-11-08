import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import Destinations from './pages/Destinations.jsx'
import TripPackage from './pages/TripPackage.jsx'
import Reviews from './pages/Reviews.jsx'
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx'
import DestinationDashboard from './pages/AdminDashboard/DestinationDashboard/DestinationDashboard.jsx'
import ReviewsDashboard from './pages/AdminDashboard/ReviewsDashboard/ReviewsDashboard';
import TripPackageDashboard from './pages/AdminDashboard/TripPackageDashboard/TripPackageDashboard.jsx'
import PlacesToVisitDashboard from './pages/AdminDashboard/PlacesToVisitDashboard/PlacesToVisitDashboard';
import RestaurantDashboard from './pages/AdminDashboard/RestaurantDashboard/RestaurantDashboard.jsx'
import HotelsDashboard from './pages/AdminDashboard/HotelsDashboard/HotelsDashboard.jsx'
import CarsDashboard from './pages/AdminDashboard/CarsDashboard/CarsDashboard.jsx'
import FlightsDashboard from './pages/AdminDashboard/FlightsDashboard/FlightsDashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/reviews",
    element: <Reviews />
  },
  {
    path: "/Destinations",
    element: <Destinations />
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />
  },
  {
    path: "/admin/dashboard/Destinations",
    element: <DestinationDashboard />
  },
  {
    path: "/admin/dashboard/Reviews",
    element: <ReviewsDashboard />
  },
  {
    path: "/admin/dashboard/TripPackage",
    element: <TripPackageDashboard />
  },
  {
    path: "/admin/dashboard/places-to-visit",
    element: <PlacesToVisitDashboard />
  },
  {
    path: "/admin/dashboard/restaurants",
    element: <RestaurantDashboard />
  },
  {
    path: "/admin/dashboard/hotels",
    element: <HotelsDashboard />
  },
  {
    path: "/admin/dashboard/cars",
    element: <CarsDashboard />
  },
  {
    path: "/admin/dashboard/flights",
    element: <FlightsDashboard />
  },
  {
    path: "/TripPackage/:id/:name",
    element: <TripPackage />
  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}>
    <RouterProvider router={router} />
  </RouterProvider>

)
