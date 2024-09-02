import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import Dashboard from "./Layouts/Dashboard";
import Unauthenticated from "./Layouts/Unauthenticated";
import Root from "./Layouts/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [{ path: "", element: <HomePage /> }],
      },
      {
        path: "/auth",
        element: <Unauthenticated />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
