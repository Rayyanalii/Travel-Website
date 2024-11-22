import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './pages/Auth/AuthContext';

// Import all page components
import Destinations from "./pages/Destinations.jsx";
import TripPackage from "./pages/TripPackage.jsx";
import ServiceFlight from "./pages/ServiceFlight.jsx";
import ServiceHotel from "./pages/Services/Hotel/ServiceHotel.jsx";
import Reviews from "./pages/Reviews.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import DestinationDashboard from "./pages/AdminDashboard/DestinationDashboard/DestinationDashboard.jsx";
import ReviewsDashboard from "./pages/AdminDashboard/ReviewsDashboard/ReviewsDashboard";
import TripPackageDashboard from "./pages/AdminDashboard/TripPackageDashboard/TripPackageDashboard.jsx";
import PlacesToVisitDashboard from "./pages/AdminDashboard/PlacesToVisitDashboard/PlacesToVisitDashboard";
import RestaurantDashboard from "./pages/AdminDashboard/RestaurantDashboard/RestaurantDashboard.jsx";
import HotelsDashboard from "./pages/AdminDashboard/HotelsDashboard/HotelsDashboard.jsx";
import CarsDashboard from "./pages/AdminDashboard/CarsDashboard/CarsDashboard.jsx";
import FlightsDashboard from "./pages/AdminDashboard/FlightsDashboard/FlightsDashboard.jsx";
import ServiceCar from "./pages/Services/Car/ServiceCar.jsx";
import SearchResults from "./pages/Services/SearchResults/SearchResults.jsx";
import DestinationDescription from "./pages/DestinationDescription.jsx";

// Define router with all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/destinations",
    element: <Destinations />,
  },
  {
    path: "/tripPackage",
    element: <TripPackage />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/dashboard/destinations",
    element: <DestinationDashboard />,
  },
  {
    path: "/admin/dashboard/reviews",
    element: <ReviewsDashboard />,
  },
  {
    path: "/admin/dashboard/tripPackage",
    element: <TripPackageDashboard />,
  },
  {
    path: "/admin/dashboard/places-to-visit",
    element: <PlacesToVisitDashboard />,
  },
  {
    path: "/admin/dashboard/restaurants",
    element: <RestaurantDashboard />,
  },
  {
    path: "/admin/dashboard/hotels",
    element: <HotelsDashboard />,
  },
  {
    path: "/admin/dashboard/cars",
    element: <CarsDashboard />,
  },
  {
    path: "/admin/dashboard/flights",
    element: <FlightsDashboard />,
  },
  {
    path: "/TripPackage/:id/:name",
    element: <TripPackage />,
  },
  {
    path: "/ServiceCar",
    element: <ServiceCar />,
  },
  {
    path: "/ServiceFlight",
    element: <ServiceFlight />,
  },
  {
    path: "/ServiceHotel",
    element: <ServiceHotel />,
  },
  {
    path: "/:service/SearchResults",
    element: <SearchResults />,
  },
  {
    path: "/Destinations/:id/:city",
    element: <DestinationDescription />,
  },
]);

// Render application
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>,
);
