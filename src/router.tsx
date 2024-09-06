import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import Dashboard from "./Layouts/Dashboard";
import Unauthenticated from "./Layouts/Unauthenticated";
import Root from "./Layouts/Root";
import Users from "./pages/users/Users";
import Tenants from "./pages/tenants/Tenants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "/users", element: <Users /> },
          { path: "/restaurants", element: <Tenants /> },
        ],
      },
      {
        path: "/auth",
        element: <Unauthenticated />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
