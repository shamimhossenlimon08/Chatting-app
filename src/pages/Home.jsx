import React from "react";
import UserLists from "../components/UserList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
const Home = () => {
  return (
    <>
      <div className=" grid grid-cols-[2fr_4fr]  ">
        <div>
          <UserLists />
        </div>
        <div className=" grid grid-cols-2 gap-x-6 ">
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
