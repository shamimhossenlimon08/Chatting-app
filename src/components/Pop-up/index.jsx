import { getAuth, signOut } from "firebase/auth";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logeOutUser } from "../../features/Slices/LoginSlice";

const FriendsProfileBtnMenu = ({ setOpenFriendsMenu, friendId }) => {
  const user = useSelector((state) => state.login.loggedIn);
  const menuref = useRef(null);
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuref.current.contains(e.target)) {
        setOpenFriendsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle unfriend

  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const frndArr = [];
      snapshot.forEach((item) => {
        frndArr.push({ ...item.val(), id: item.key });
      });
      setFriend(frndArr);
    });
  }, [db]);

  const handleUnfriend = () => {
    const friendUnfriend = friend.find(
      (item) =>
        (item.senderId === user.uid && item.receiverId === friendId) ||
        (item.senderId === friendId && item.receiverId === user.uid)
    );
    if (friendUnfriend) {
      remove(ref(db, "friends/" + friendUnfriend.id));
      setOpenFriendsMenu(false);
    }
  };

  return (
    <>
      <div
        ref={menuref}
        className="  bg-green-100  shadow-lg rounded-b-md rounded-tr-md w-[200px] h-auto absolute top-[550px] right-[420px]  z-10 mt-6 "
      >
        <div className="w-0 h-0  border-r-[15px] border-r-transparent  border-b-[15px] border-b-green-100 absolute -top-3 "></div>
        <ul>
          <li
            className=" py-2 hover:bg-gray-300 cursor-pointer rounded m-2 "
            onClick={handleUnfriend}
          >
            <div className="flex items-center gap-x-2 pl-2  ">
              <div className="text-2xl">
                <FaUserXmark />
              </div>
              <span className="text-xl font-semibold"> Unfriend</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

// logout confirmation modal page

export const LogOutConfirmModel = ({ setShowLogoutModal }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
              onClick={handelLogout}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              onClick={() => setShowLogoutModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsProfileBtnMenu;
