import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Unauthenticated = () => {
  const { user } = useAuthStore();
  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <h1>Unauthenticated</h1>
      <Outlet />
    </>
  );
};

export default Unauthenticated;
