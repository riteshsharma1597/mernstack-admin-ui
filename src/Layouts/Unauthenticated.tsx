import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

const Unauthenticated = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  if (user !== null) {
    const returnTo =
      new URLSearchParams(location.search).get("returnTo") || "/";
    return <Navigate to={returnTo} replace={true} />;
  }
  return (
    <>
      <h1>Unauthenticated</h1>
      <Outlet />
    </>
  );
};

export default Unauthenticated;
