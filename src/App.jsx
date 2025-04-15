import { Route, Routes } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LoggedInUserRoute from "./privateRoute/LoggedInUserRoute";
import NotLoggedInUserRoute from "./privateRoute/NotLoggedInUserRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoggedInUserRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoggedInUserRoute />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
