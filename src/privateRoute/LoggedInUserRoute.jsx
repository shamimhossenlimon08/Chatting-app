import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "../pages/Login";

export default function LoggedInUserRoute() {
  const user = useSelector((state) => state.login.loggedIn);
  return user ? <Outlet /> : <Login />;
}
