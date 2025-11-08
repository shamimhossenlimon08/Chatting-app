import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../svg/AddFriendIcon";
import { FiSearch } from "react-icons/fi";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import avatarImage from "../../assets/avatar-img/avatar-male.jpg";
import { useNavigate } from "react-router";
import FriendRequest from "../FriendRequest";
import Friends from "../Friends";

const UserLists = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const [users, setUsers] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [respondOpen, setRespondOpen] = useState(null);
  const [cancelReq, setCancelReq] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("allUsers"); // 🔹 New: current tab state
  const navigate = useNavigate();

  const db = getDatabase();
  const storage = getStorage();

  // 🔹 Load all users
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const usersArr = [];
      snapshot.forEach((item) => {
        if (user.uid !== item.key) {
          getDownloadURL(Ref(storage, item.key))
            .then((downloadURL) => {
              usersArr.push({
                ...item.val(),
                id: item.key,
                photoURL: downloadURL,
              });
            })
            .catch(() => {
              usersArr.push({
                ...item.val(),
                id: item.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...usersArr]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  // 🔹 Send Friend Request
  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest/")), {
      senderName: user.displayName,
      senderId: user.uid,
      currentProfile: user.photoURL ?? avatarImage,
      receiverName: data.username,
      receiverId: data.id,
      receiverProfile: data.photoURL ?? avatarImage,
    });
  };

  // 🔹 Friend Request & Cancel List
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      const reqArr = [];
      const cancelArr = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().senderId);
        cancelArr.push({ ...item.val(), id: item.key });
      });
      setFriendReqList(reqArr);
      setCancelReq(cancelArr);
    });
  }, [db]);

  // 🔹 Cancel Request
  const handleCancelReq = (itemId) => {
    const reqToCancel = cancelReq.find(
      (item) => item.receiverId === itemId && item.senderId === user.uid
    );
    if (reqToCancel) remove(ref(db, "friendRequest/" + reqToCancel.id));
  };

  // 🔹 Friends
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        friendsArr.push(item.val().receiverId + item.val().senderId);
      });
      setFriends(friendsArr);
    });
  }, [db]);

  // 🔹 Confirm / Delete Requests
  const handleConfirm = (req) => {
    set(push(ref(db, "friends")), { ...req }).then(() =>
      remove(ref(db, "friendRequest/" + req.id))
    );
  };

  const handleDelete = (req) => {
    remove(ref(db, "friendRequest/" + req.id));
    setRespondOpen(null);
  };

  // 🔹 Search Filter
  const filteredUsers = users.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 🔹 Tabs */}
      <div className="border-b border-gray-300 mb-4  block md:hidden">
        <ul className="flex justify-between mx-4 text-md font-medium text-gray-600">
          <li>
            <button
              onClick={() => setActiveTab("allUsers")}
              className={`pb-2 ${
                activeTab === "allUsers"
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : ""
              }`}
            >
              All Users
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("friendRequests")}
              className={`pb-2 ${
                activeTab === "friendRequests"
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : ""
              }`}
            >
              Friend Request
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("allFriends")}
              className={`pb-2 ${
                activeTab === "allFriends"
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : ""
              }`}
            >
              All Friends
            </button>
          </li>
        </ul>
      </div>

      {/* 🔹 Tab Content Area */}
      <div className=" md:p-5 md:mr-5 shadow-md bg-gradient-to-b from-white/80 to-white/50 h-[950px] md:h-[800px] overflow-y-auto rounded-md">
        {/* ✅ All Users */}
        {activeTab === "allUsers" && (
          <>
            <div className="flex items-center justify-between px-4 pt-4 md:pt-0 md:px-0">
              <h1 className="font-roboto font-bold text-lg md:text-xl">
                All Users
              </h1>
              <div className="flex items-center relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-2 border-gray-300 rounded-full py-1 pl-11 focus:outline-none focus:border-blue-900 w-45"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="text-xl absolute top-[50%] left-3 translate-y-[-50%]">
                  <FiSearch />
                </div>
              </div>
            </div>

            {filteredUsers.map((item, i) => (
              <div
                className="flex items-center justify-between mt-5 px-4 md:px-0"
                key={i}
              >
                <div
                  className="flex items-center gap-x-2"
                  onClick={() => navigate("/profile", { state: item })}
                >
                  <div className=" w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden cursor-pointer">
                    <img
                      src={item.photoURL || avatarImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-sans text-lg md:text-xl font-semibold text-[#1e1e1e] hover:underline cursor-pointer">
                    {item.username}
                  </h3>
                </div>

                {/* Friend Buttons */}
                {friends.includes(item.id + user.uid) ||
                friends.includes(user.uid + item.id) ? (
                  <button className="text-green-700 px-4 py-2 rounded-md text-lg">
                    Friend
                  </button>
                ) : friendReqList.includes(item.id + user.uid) ? (
                  <button
                    className="bg-white shadow-2xl px-4 py-2 rounded-md text-lg"
                    onClick={() => handleCancelReq(item.id)}
                  >
                    Cancel Request
                  </button>
                ) : friendReqList.includes(user.uid + item.id) ? (
                  respondOpen === item.id ? (
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white text-lg px-4 py-1.5 rounded-md"
                        onClick={() =>
                          handleConfirm(
                            cancelReq.find(
                              (req) =>
                                req.senderId === item.id &&
                                req.receiverId === user.uid
                            )
                          )
                        }
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-red-500 text-white text-lg px-4 py-1.5 rounded-md"
                        onClick={() =>
                          handleDelete(
                            cancelReq.find(
                              (req) =>
                                req.senderId === item.id &&
                                req.receiverId === user.uid
                            )
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 text-white text-lg px-4 py-1.5 rounded-md"
                      onClick={() => setRespondOpen(item.id)}
                    >
                      Respond
                    </button>
                  )
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleFriendRequest(item)}
                  >
                    <AddFriendIcon />
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* ✅ Friend Requests Page */}
        {activeTab === "friendRequests" && <FriendRequest />}

        {/* ✅ All Friends Page */}
        {activeTab === "allFriends" && <Friends />}
      </div>
    </>
  );
};

export default UserLists;
