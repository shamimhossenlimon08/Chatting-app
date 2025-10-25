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

const UserLists = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const [users, setUsers] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [respondOpen, setRespondOpen] = useState(null);
  const [cancelReq, setCancelReq] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((item) => {
        if (user.uid !== item.key) {
          getDownloadURL(Ref(storage, item.key))
            .then((downloadURL) => {
              users.push({
                ...item.val(),
                id: item.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...item.val(),
                id: item.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  // sent friendRequest handler

  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest/")), {
      senderName: user.displayName,
      senderId: user.uid,
      currentProfile: user.photoURL ?? "/src/assets/avatar-img/avatar-male.jpg",
      receiverName: data.username,
      receiverId: data.id,
      receiverProfile:
        data.photoURL ?? "/src/assets//avatar-img/avatar-male.jpg",
      // status: "pending",
      // timestamp: new Date().getTime(),
    });
  };

  // show cancel button,respond button and cancel friend request handler

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      const reqArr = [];
      const cancelReqArr = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().senderId);
        cancelReqArr.push({ ...item.val(), id: item.key });
      });
      setFriendReqList(reqArr);
      setCancelReq(cancelReqArr);
    });
  }, [db]);

  const handleCancelReq = (itemId) => {
    const reqToCancel = cancelReq.find(
      (item) => item.receiverId === itemId && item.senderId === user.uid
    );
    if (reqToCancel) {
      remove(ref(db, "friendRequest/" + reqToCancel.id));
    }
  };

  // show friend button

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

  // Respon button in confirm friend request handler

  const handleConfirm = (req) => {
    set(push(ref(db, "friends")), {
      ...req,
    }).then(() => {
      remove(ref(db, "friendRequest/" + req.id));
    });
  };

  //Respon button in delete friend request handler

  const handleDelete = (req) => {
    remove(ref(db, "friendRequest/" + req.id));
    setRespondOpen(null); // Close the respond panel after deletion
  };

  // Filter users based on search term then filteredusers used in map function

  const filteredUsers = users.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="  p-5 mr-5 shadow-md bg-gradient-to-b from-white/80 to-white/50 h-[800px]  overflow-y-auto  rounded-md">
        <div className="flex items-center justify-between ">
          <h1 className="font-roboto font-bold text-xl">All Users </h1>
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-gray-300 rounded-full  py-1 pl-11 focus:outline-none focus:border-blue-900 w-45"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className=" text-xl absolute top-[50%] left-3 translate-y-[-50%] ">
              <FiSearch />
            </div>
          </div>
        </div>

        {filteredUsers.map((item, i) => (
          <div className="flex items-center justify-between mt-5" key={i}>
            <div
              className="flex  items-center gap-x-2"
              onClick={() => navigate("/profile", { state: item })}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
                <img
                  src={item.photoURL || avatarImage}
                  alt=""
                  className="w-full h-full object-cover "
                />
              </div>
              <h3 className="font-sans text-xl font-semibold text-[#1e1e1e]  hover: cursor-pointer hover:underline ">
                {item.username}
              </h3>
            </div>
            {/* 🔹 Already Friends */}
            {friends.includes(item.id + user.uid) ||
            friends.includes(user.uid + item.id) ? (
              <button className="text-green-700 px-4 py-2 rounded-md text-lg cursor-pointer">
                Friend
              </button>
            ) : /* 🔹 Sent Request */
            friendReqList.includes(item.id + user.uid) ? (
              <button
                className="bg-white shadow-2xl px-4 py-2 rounded-md text-lg cursor-pointer"
                onClick={() => handleCancelReq(item.id)}
              >
                Cancel Request
              </button>
            ) : /* 🔹 Received Request */
            friendReqList.includes(user.uid + item.id) ? (
              respondOpen === item.id ? (
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white text-lg px-4 py-1.5 rounded-md cursor-pointer"
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
                    className="bg-red-500 text-white text-lg px-4 py-1.5 rounded-md cursor-pointer"
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
                  className="bg-blue-500 text-white text-lg px-4 py-1.5 rounded-md cursor-pointer"
                  onClick={() => setRespondOpen(item.id)}
                >
                  Respond
                </button>
              )
            ) : (
              /* 🔹 Default Add Friend */
              <div
                className="cursor-pointer"
                onClick={() => handleFriendRequest(item)}
              >
                <AddFriendIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserLists;
