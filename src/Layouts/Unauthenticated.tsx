import { Outlet } from "react-router-dom";

const Unauthenticated = () => {
  return (
    <>
      <h1>Unauthenticated</h1>
      <Outlet />
    </>
  );
};

export default Unauthenticated;
