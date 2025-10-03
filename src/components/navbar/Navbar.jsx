import React, { use, useState } from "react";
import { FriendsIcon } from "../../svg/FriendsIcon";
import { MessageIcon } from "../../svg/MessageIcon";
import { Link, useLocation } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logeOutUser } from "../../features/Slices/LoginSlice";
import { CameraIcon } from "../../svg/CameraIcon";
import { createPortal } from "react-dom";
import Modals from "../Modals";
import avatarImage from "../../assets/avatar-img/avatar-male.jpg";

const Navbar = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useLocation();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(logeOutUser());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="  bg-slate-900 flex items-center justify-between px-7  py-3 rounded-t-md ">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <div className="w-14 h-14 bg-orange-200 rounded-full overflow-hidden">
              <img
                src={user.photoURL || avatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="w-5 h-5 bg-white rounded-full flex items-center justify-center absolute right-0 bottom-0 cursor-pointer "
              onClick={() => setShow(true)}
            >
              <CameraIcon />
            </div>
          </div>

          <div className="font-Roboto text-white text-3xl">
            {user.displayName}
          </div>
        </div>
        <div className="flex items-center gap-x-4 ">
          <Link
            to="/"
            className={`${
              location.pathname == "/"
                ? "text-white bg-[#6CD0FB]"
                : "text-[#292D32] bg-white "
            }  w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <FriendsIcon />
          </Link>
          <Link
            to="/message"
            className={`${
              location.pathname == "/message"
                ? "text-white bg-[#6CD0FB]"
                : "text-[#292D32] bg-white"
            } w-10 h-10  rounded-full flex items-center justify-center`}
          >
            <MessageIcon />
          </Link>
        </div>
        <div>
          <button
            className="bg-[#6CD0FB] px-4 py-2 rounded-md font-Roboto font-bold text-white text-sm cursor-pointer"
            onClick={handelLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {show && createPortal(<Modals setShow={setShow} />, document.body)}
    </>
  );
};

export default Navbar;
