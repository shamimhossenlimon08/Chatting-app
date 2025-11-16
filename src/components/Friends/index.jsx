import { getDatabase, onValue, ref, set } from "firebase/database";
import React, { use, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import avatarImage from "../../assets/avatar-img/avatar-male.jpg";
import { ActiveSingle } from "../../features/Slices/ActiveSingleSlice";

const Friends = ({ onFriendClick }) => {
  const user = useSelector((state) => state.login.loggedIn);
  const [friends, setfriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const db = getDatabase();
  const dispatch = useDispatch();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const frndArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().senderId ||
          user.uid === item.val().receiverId
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setfriends(frndArr);
    });
  }, [db, user.uid]);

  // handle profile page and chatting page in profile pic,name show

  const handleProfile = (item) => {
    const friendInfo = {
      friendId: user.uid === item.senderId ? item.receiverId : item.senderId,
      name: user.uid === item.senderId ? item.receiverName : item.senderName,
      profile:
        user.uid === item.senderId ? item.receiverProfile : item.senderProfile,
      status: "single",
    };

    if (location.pathname === "/message") {
      dispatch(ActiveSingle(friendInfo));
      localStorage.setItem("active", JSON.stringify(friendInfo));
    } else if (location.pathname === "/") {
      navigate("/profile", { state: friendInfo });
    } else {
      console.log("null");
    }

    if (onFriendClick) {
      onFriendClick(friendInfo);
    }
  };

  // filter friends based on search term then use filteredfriends in map function

  const filteredFriends = friends.filter((item) =>
    (user.uid === item.senderId ? item.receiverName : item.senderName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const profileImage =
    (user.uid === filteredFriends.senderId
      ? filteredFriends.receiverProfile
      : filteredFriends.senderProfile) || avatarImage;

  return (
    <>
      <div className="shadow-md rounded-md p-5  bg-gradient-to-b from-white/80 to-white/50 h-[950px] md:h-[800px]  overflow-y-auto ">
        <div className="flex items-center justify-between ">
          <h1 className="font-roboto font-bold text-lg md:text-xl">
            {location.pathname === "/message" ? "Messages" : " All Friends"}
          </h1>
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-45 border-2 border-gray-300 rounded-full  py-1 pl-11 focus:outline-none focus:border-blue-900 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className=" text-xl absolute top-[50%] left-3 translate-y-[-50%]">
              <FiSearch />
            </div>
          </div>
        </div>
        {filteredFriends?.map((item) => (
          <div className="flex items-center justify-between mt-5" key={item.id}>
            <div
              className="flex items-center gap-x-2  hover:bg-slate-100 cursor-pointer px-1 rounded w-[600px]"
              onClick={() => handleProfile(item)}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full  overflow-hidden shrink-0">
                {/* {user.uid === item.receiverId ? (
                  <img src={item.currentProfile || avatarImage} alt="" />
                ) : (
                  <img src={item.receiverProfile || avatarImage} alt="" />
                )} */}
                <img src={profileImage} alt="" />
              </div>
              <h3 className="font-sans text-lg md:text-xl font-semibold text-[#1e1e1e]">
                {user.uid === item.senderId
                  ? item.receiverName
                  : item.senderName}
              </h3>
            </div>
            {location.pathname == "/" && (
              <button
                className="bg-[#6c9efb] text-white  text-md md:text-lg px-2 py-1 md:px-4 md:py-2 rounded-md font-sans cursor-pointer"
                onClick={() => navigate("/message")}
              >
                Message
              </button>
            )}
          </div>
        ))}
        {filteredFriends.length === 0 && (
          <h3 className="text-center mt-67 font-sans text-xl">
            No Friend Found
          </h3>
        )}
      </div>
    </>
  );
};

export default Friends;
