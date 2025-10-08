import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const FriendsProfileBtnMenu = ({ setOpenFriendsMenu, friendId }) => {
  const user = useSelector((state) => state.login.loggedIn);
  const menuref = useRef(null);
  const [friend, setFriend] = useState([]);
  const navigate = useNavigate();

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
  }, []);

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
        className="  bg-green-100  shadow-lg rounded-b-md rounded-tr-md w-[200px] h-auto absolute right-[420px]  z-10 mt-6 "
      >
        <div className="w-0 h-0  border-r-[15px] border-r-transparent  border-b-[15px] border-b-green-100 absolute -top-3 "></div>
        <ul>
          <li
            className=" py-2 hover:bg-gray-300 cursor-pointer rounded m-2 "
            onClick={handleUnfriend}
          >
            <div className="flex items-center gap-x-2 pl-2">
              <div className="text-2xl">
                <FaUserXmark />
              </div>
              Unfriend
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FriendsProfileBtnMenu;
