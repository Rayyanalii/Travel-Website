import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Destinations from "./pages/Destinations.jsx";
import TripPackage from "./pages/TripPackage.jsx";
import ServiceFlight from "./pages/ServiceFlight.jsx";
import ServiceHotel from "./pages/Services/Hotel/ServiceHotel.jsx";

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
    path: "/ServiceFlight",
    element: <ServiceFlight />,
  },
  {
    path: "/ServiceHotel",
    element: <ServiceHotel />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
