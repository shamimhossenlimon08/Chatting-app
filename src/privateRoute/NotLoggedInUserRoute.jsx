import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export default function NotLoggedInUserRoute() {
  const user = useSelector((state) => state.login.loggedIn);
  return user ? <Navigate to="/" /> : <Outlet />;
}
