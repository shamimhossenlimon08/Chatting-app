import { Route, Routes } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LoggedInUserRoute from "./privateRoute/LoggedInUserRoute";
import NotLoggedInUserRoute from "./privateRoute/NotLoggedInUserRoute";
import Messages from "./pages/Messages";
import RootLayout from "./components/RootLayout";
import "cropperjs/dist/cropper.css";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoggedInUserRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Messages />} />
          </Route>
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
