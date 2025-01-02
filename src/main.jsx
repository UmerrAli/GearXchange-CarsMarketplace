import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./home-page/home";
import Contact from "./about-us/contact";

import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./profile/profile";
import NewAd from "./new-ad/newAd";
import UsedCars from "./used-cars/usedCars";
import AdDetails from "./ad-details/[id]/adDetails";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/new-ad",
    element: <NewAd />,
  },
  {
    path: "/used",
    element: <UsedCars />,
  },
  {
    path: "/ad-details/:id",
    element: <AdDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
