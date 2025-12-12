import { createBrowserRouter } from "react-router-dom";
import UsedCars from "../pages/used-cars/usedCars";
import AdDetails from "../pages/ad-details/[id]/adDetails";
import Home from "../pages/home-page/home";
import Contact from "../pages/about-us/contact";
import Profile from "../pages/profile/profile";
import NewAd from "../pages/new-ad/newAd";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export const router = createBrowserRouter([
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
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
