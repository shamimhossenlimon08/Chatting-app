import React from "react";
import { FriendsIcon } from "../../svg/FriendsIcon";
import { MessageIcon } from "../../svg/MessageIcon";
import { Link, useLocation } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logeOutUser } from "../../features/Slices/LoginSlice";

const Navbar = () => {
  const location = useLocation();
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useLocation();

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
          <div className="w-14 h-14 bg-orange-200 rounded-full overflow-hidden"></div>
          <div className="font-Roboto text-white ">Shamim Hossen Limon</div>
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
    </>
  );
};

export default Navbar;
