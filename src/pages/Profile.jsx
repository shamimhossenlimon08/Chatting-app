import React, { use, useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import Navbar from "../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router";
// import avatarImage from "../assets/avatar-img/avatar-male.jpg";
import { AddFriendIcon } from "../svg/AddFriendIcon";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import FriendsProfileBtnMenu from "../components/Pop-up";

const Profile = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const [friends, setFriends] = useState([]);
  const [openFriendsMenu, setOpenFriendsMenu] = useState(false);
  const [friendRequest, setFriendRequest] = useState([]);
  const [showRespondOptions, setShowRespondOptions] = useState(false);
  const [isFriendState, setIsFriendState] = useState(false);
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
  }, [db, user.uid]);

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

  // handle cancel friend request

  useEffect(() => {
    const friendReqRef = ref(db, "friendRequest/");
    onValue(friendReqRef, (snapshot) => {
      const cancelReqArr = [];
      snapshot.forEach((item) => {
        cancelReqArr.push({ ...item.val(), id: item.key });
      });
      setFriendRequest(cancelReqArr);
    });
  }, [db]);

  // 🔹 Check if friend request sent
  const isRequestSent = friendRequest.some(
    (item) => item.senderId === user.uid && item.receiverId === profileUid
  );

  const handleCancelReq = () => {
    friendRequest.find((item) => {
      if (item.senderId === user.uid && item.receiverId === profileUid) {
        remove(ref(db, "friendRequest/" + item.id));
      }
    });
  };

  //  friend request user show in profile page
  // const isFriendRequest = data?.friendReqId || data?.id; // ei line er bodole nicher line ta use kora hoise jate real time e friend request er status ta pawa jai
  const isFriendRequest = friendRequest.some(
    (item) => item.receiverId === user.uid && item.senderId === profileUid
  );

  // handle respond button
  const handleRespondReq = () => {
    setShowRespondOptions(true);
  };

  // confirm friend request
  const handleConfirm = () => {
    const req = friendRequest.find(
      (item) =>
        item.receiverId === user.uid &&
        item.senderId === (data.friendReqId || data.id)
    );

    if (req) {
      set(push(ref(db, "friends/")), {
        senderId: req.senderId,
        senderName: req.senderName,
        senderProfile: req.senderProfile || avatarImage,
        receiverId: user.uid,
        receiverName: user.displayName,
        receiverProfile: user.photoURL || avatarImage,
      })
        .then(() => {
          remove(ref(db, "friendRequest/" + req.id));
          setShowRespondOptions(false);
          setIsFriendState(true); // friend হলে Friends button দেখাবে
          setIsRequestState(false); // আর Respond button দেখাবে না
        })
        .catch((err) => console.log(err));
    }
  };

  // friend request remove

  const handleDelete = () => {
    const req = friendRequest.find(
      (item) =>
        item.receiverId === user.uid &&
        item.senderId === (data.friendReqId || data.id)
    );

    if (req) {
      remove(ref(db, "friendRequest/" + req.id))
        .then(() => {
          setShowRespondOptions(false);
          setIsRequestState(false); // Delete করলে Respond button আর দেখাবে না
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <div className="fixed top-0 left-0 w-full ">
          <Navbar />
        </div>
        <div className="h-screen w-full mt-19">
          <div className="bg-[rgba(255,252,252,0.5)]  h-[70%] w-full">
            <div className="bg-[rgba(174,173,177,0.5)] h-[50%] md:w-[70%] w-[100%]  mx-auto md:rounded-b-md"></div>
            <div className="bg-white h-[40%] w-[100%] md:w-[65%]  mx-auto ">
              <div className="flex items-center justify-between">
                <div className="flex gap-x-3 ">
                  <div className=" w-[60px] h-[60px] md:w-[180px] md:h-[180px] rounded-[50%] translate-y-[-30%] cursor-pointer overflow-hidden">
                    <img
                      src={
                        data?.reqProfile ||
                        data?.profile ||
                        data?.photoURL ||
                        avatarImage
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className=" md:text-5xl text-xl font-semibold mt-6 ">
                    {data?.reqName || data?.name || data?.username}
                  </h3>
                </div>

                <div className="flex md:gap-x-6 gap-x-1 ml-1 md:ml-0">
                  {isFriendState || isFriend ? (
                    // Friends button
                    <button
                      className="bg-[rgba(197,192,192,0.5)] text-md md:text-xl font-medium font-sans rounded-md md:py-3 md:px-6 py-1 px-1 cursor-pointer "
                      onClick={handleFriendsMenu}
                    >
                      <div className="flex items-center md:gap-x-2 gap-x-1">
                        <div className="text-lg md:text-2xl">
                          <FaUserCheck />
                        </div>

                        <p>Friends</p>
                      </div>
                    </button>
                  ) : isRequestSent ? (
                    // Cancel Request button
                    <button
                      className="bg-white shadow-2xl text-lg  md:text-xl font-medium font-sans rounded-md md:py-2 md:px-5 py-1 px-1 cursor-pointer"
                      onClick={handleCancelReq}
                    >
                      <div className="flex items-center md:gap-x-2 gap-x-1">
                        <p>Cancel Request</p>
                      </div>
                    </button>
                  ) : isFriendRequest ? (
                    showRespondOptions ? (
                      // Confirm + Delete
                      <div className="flex md:gap-x-3  gap-x-1">
                        <button
                          className="bg-green-500 hover:bg-green-600 transition text-white text-lg md:text-xl font-medium font-sans rounded-md md:py-3 md:px-6 py-1 px-1 cursor-pointer"
                          onClick={handleConfirm}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 transition text-white text-lg md:text-xl font-medium font-sans rounded-md md:py-3 md:px-6 py-1 px-1 cursor-pointer"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      // Respond button
                      <button
                        className="bg-green-500  hover:bg-green-600 transition text-white text-lg md:text-xl font-medium font-sans rounded-md md:py-3 md:px-6 py-1 px-1 cursor-pointer"
                        onClick={handleRespondReq}
                      >
                        <div className="flex items-center md:gap-x-2 gap-x-1">
                          <FaUserCheck className=" text-lg md:text-2xl" />
                          <p>Respond</p>
                        </div>
                      </button>
                    )
                  ) : (
                    // Add Friend button
                    <button
                      className="bg-[rgba(156,202,252,0.5)] text-lg md:text-xl font-medium font-sans rounded-md md:py-2 md:px-5 py-1 px-1 cursor-pointer"
                      onClick={handleAddFriend}
                    >
                      <div className="flex items-center md:gap-x-2 gap-x-1">
                        <div className="text-blue-700">
                          <AddFriendIcon />
                        </div>
                        <p className="text-blue-700">Add friend</p>
                      </div>
                    </button>
                  )}

                  <button
                    className="bg-blue-500 text-white text-lg md:text-xl font-medium font-sans rounded-md md:py-2 md:px-5 py-1 px-1 cursor-pointer "
                    onClick={() => navigate("/message")}
                  >
                    <div className="flex items-center md:gap-x-2 gap-x-1">
                      <div className=" text-lg md:text-2xl">
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
            <div className="bg-white h-full md:w-[65%] w-[80%] mx-auto rounded-md "></div>
          </div>
        </div>
      </div>
      {openFriendsMenu && (
        <FriendsProfileBtnMenu
          setOpenFriendsMenu={setOpenFriendsMenu}
          friendId={data?.friendId || data?.id}
        />
      )}
    </>
  );
};

export default Profile;
