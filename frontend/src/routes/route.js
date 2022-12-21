import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
]);
