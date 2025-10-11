import { getDatabase, onValue, ref } from "firebase/database";
import React, { use, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import avatarImage from "../../assets/avatar-img/avatar-male.jpg";

const Friends = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const [friends, setfriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const db = getDatabase();

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

  // handle profile

  const handleProfile = (item) => {
    const friendInfo = {
      friendId: user.uid === item.senderId ? item.receiverId : item.senderId,
      name: user.uid === item.senderId ? item.receiverName : item.senderName,
      profile:
        user.uid === item.senderId ? item.receiverProfile : item.senderProfile,
    };
    navigate("/profile", { state: friendInfo });
  };

  // filter friends based on search term then use filteredfriends in map function

  const filteredFriends = friends.filter((item) =>
    (user.uid === item.senderId ? item.receiverName : item.senderName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="shadow-md rounded-md p-5  bg-gradient-to-b from-white/80 to-white/50 h-full overflow-y-auto">
        <div className="flex items-center justify-between ">
          <h1 className="font-roboto font-bold text-lg">All Friends</h1>
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
              <div className="w-12 h-12 rounded-full  overflow-hidden shrink-0">
                {user.uid === item.receiverId ? (
                  <img src={item.currentProfile || avatarImage} alt="" />
                ) : (
                  <img src={item.receiverProfile || avatarImage} alt="" />
                )}
              </div>
              <h3 className="font-sans text-xl">
                {user.uid === item.senderId
                  ? item.receiverName
                  : item.senderName}
              </h3>
            </div>
            {location.pathname == "/" && (
              <button
                className="bg-[#6c9efb] text-white text-lg px-4 py-2 rounded-md font-sans cursor-pointer"
                onClick={() => navigate("/message")}
              >
                Message
              </button>
            )}
          </div>
        ))}
        {filteredFriends.length === 0 && (
          <h3 className="text-center mt-67 font-sans text-lg">
            No Friend Found
          </h3>
        )}
      </div>
    </>
  );
};

export default Friends;
