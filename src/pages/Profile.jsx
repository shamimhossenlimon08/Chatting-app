import React, { use, useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import Navbar from "../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router";
import avatarImage from "../assets/avatar-img/avatar-male.jpg";
import { AddFriendIcon } from "../svg/AddFriendIcon";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import FriendsProfileBtnMenu from "../components/Pop-up";

const Profile = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const [friends, setFriends] = useState([]);
  const [openFriendsMenu, setOpenFriendsMenu] = useState(false);
  const location = useLocation();
  const data = location.state;
  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        friendsArr.push({ ...item.val(), id: item.key });
      });
      setFriends(friendsArr);
    });
  }, []);

  const profileUid = data?.friendId || data?.id;
  const isFriend = friends.some(
    (item) =>
      (item.senderId === user.uid && item.receiverId === profileUid) ||
      (item.senderId === profileUid && item.receiverId === user.uid)
  );

  // frends menu handler
  const handleFriendsMenu = () => {
    setOpenFriendsMenu(!openFriendsMenu);
  };

  // Add friend handler

  const handleAddFriend = () => {
    set(push(ref(db, "friendRequest/")), {
      senderId: user.uid,
      senderName: user.displayName,
      currentProfile: user.photoURL ?? "/src/assets/avatar-img/avatar-male.jpg",
      receiverId: profileUid,
      receiverName: data?.name || data?.username,
      receiverProfile: data?.profile || data?.photoURL || avatarImage,
    });
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="h-screen w-full">
          <div className="bg-[rgba(255,252,252,0.5)]  h-[70%] w-full">
            <div className="bg-[rgba(174,173,177,0.5)] h-[60%] w-[70%] mx-auto rounded-b-md"></div>
            <div className="bg-white h-[40%] w-[65%] mx-auto ">
              <div className="flex items-center justify-between">
                <div className="flex gap-x-3 ">
                  <div className=" w-[180px] h-[180px] rounded-[50%] translate-y-[-30%] cursor-pointer overflow-hidden">
                    <img
                      src={data?.profile || data?.photoURL || avatarImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className=" text-5xl font-semibold mt-6 ">
                    {data?.name || data?.username}
                  </h3>
                </div>

                <div className="flex gap-x-6">
                  {isFriend ? (
                    <button
                      className="bg-[rgba(197,192,192,0.5)] text-xl font-medium font-sans rounded-md py-2 px-5 cursor-pointer "
                      onClick={handleFriendsMenu}
                    >
                      <div className="flex items-center gap-x-2 ">
                        <FaUserCheck className="text-2xl" />
                        <p>Friends</p>
                      </div>
                      {openFriendsMenu && (
                        <FriendsProfileBtnMenu
                          setOpenFriendsMenu={setOpenFriendsMenu}
                          friendId={data?.friendId || data?.id}
                        />
                      )}
                    </button>
                  ) : (
                    <button
                      className="bg-[rgba(156,202,252,0.5)] text-xl font-medium font-sans rounded-md py-2 px-5 cursor-pointer"
                      onClick={handleAddFriend}
                    >
                      <div className="flex items-center gap-x-2">
                        <div className="text-blue-700">
                          <AddFriendIcon />
                        </div>
                        <p className="text-blue-700">Add friend</p>
                      </div>
                    </button>
                  )}

                  <button
                    className="bg-blue-500 text-white text-xl font-medium font-sans rounded-md py-2 px-5 cursor-pointer "
                    onClick={() => navigate("/message")}
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="text-2xl">
                        <RiMessengerFill />
                      </div>
                      <p>Message</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[rgba(201,197,197,0.5)] h-screen w-full pt-8 ">
            <div className="bg-white h-full w-[65%]  mx-auto rounded-md "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
