import React from "react";
import UserLists from "../components/UserList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friens";
const Home = () => {
  return (
    <>
      <div className="grid grid-cols-[2fr_4fr] ">
        <div className="w-full ">
          <UserLists />
        </div>
        <div className=" w-full grid grid-cols-2 gap-x-10 ">
          <div>
            <FriendRequest />
          </div>
          <div>
            <Friends />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
