import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatarImage from "../../assets/avatar-img/avatar-male.jpg";
import { useNavigate } from "react-router";

const FriendRequest = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const [friendReqList, setFriendRequList] = useState([]);
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      const frndReq = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().receiverId) {
          frndReq.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequList(frndReq);
    });
  }, [db, user.uid]);

  // confirm friend request
  const handleConfirmReq = (data) => {
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendRequest/" + data.id));
    });
  };

  // delete friend request

  const handleDeleteReq = (data) => {
    remove(ref(db, "friendRequest/" + data.id));
  };

  // handle friendReq Profile

  const handleReqProfile = (item) => {
    const friendReqInfo = {
      friendReqId: item.senderId,
      reqName: item.senderName,
      reqProfile: item.currentProfile,
    };

    navigate("/profile", { state: friendReqInfo });
  };

  return (
    <>
      <div className="shadow-md rounded-md py-5 pl-5 pr-3 bg-gradient-to-b from-white/80 to-white/50 h-full overflow-y-auto">
        <h1 className="font-roboto font-bold text-lg">Friend Requests</h1>
        {friendReqList?.map((item) => (
          <div className="flex items-center justify-between mt-5" key={item.id}>
            <div
              className="flex items-center gap-x-2 "
              onClick={() => handleReqProfile(item)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 cursor-pointer">
                <img src={item.currentProfile || avatarImage} />
              </div>
              <h3 className="font-sans text-xl hover:cursor-pointer hover:underline">
                {item.senderName}
              </h3>
            </div>
            <div className="flex items-center gap-x-2">
              <button
                className="bg-blue-500 text-white text-lg px-4 py-1.5 rounded-md cursor-pointer"
                onClick={() => handleConfirmReq(item)}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white text-lg px-4 py-1.5  rounded-md cursor-pointer "
                onClick={() => handleDeleteReq(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {friendReqList.length === 0 && (
          <h3 className="text-center mt-70 font-sans text-lg">
            No Friend Request
          </h3>
        )}
      </div>
    </>
  );
};

export default FriendRequest;
