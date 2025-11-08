import React from "react";
import UserLists from "../components/UserList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
const Home = () => {
  return (
    <>
      <div className="  md:grid md:grid-cols-[2fr_4fr]  ">
        <div>
          <UserLists />
        </div>
        <div className=" md:grid md:grid-cols-2 md:gap-x-6 ">
          <div className=" hidden md:block">
            <FriendRequest />
          </div>
          <div className=" hidden md:block">
            <Friends />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
