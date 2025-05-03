import React from "react";
import { AddFriendIcon } from "../../svg/AddFriendIcon";
import { FiSearch } from "react-icons/fi";

const UserLists = () => {
  return (
    <>
      <div className="  p-5 mr-5 bg-[#FBFBFB] h-[360px] overflow-y-auto ">
        <div className="flex items-center justify-between ">
          <h1 className="font-roboto font-bold text-lg">All Users </h1>
          <div className="text-xl">
            <FiSearch />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 rounded-full bg-purple-500 overflow-hidden"></div>
            <h3 className="font-sans text-base ">Shamim Hosen Limon</h3>
          </div>
          <div className="cursor-pointer ">
            <AddFriendIcon />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 rounded-full bg-purple-500 overflow-hidden"></div>
            <h3 className="font-sans text-base">Shamim Hosen Limon</h3>
          </div>
          <div className="cursor-pointer">
            <AddFriendIcon />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 rounded-full bg-purple-500 overflow-hidden"></div>
            <h3 className="font-sans text-base">Shamim Hosen Limon</h3>
          </div>
          <div className="cursor-pointer">
            <AddFriendIcon />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 rounded-full bg-purple-500 overflow-hidden"></div>
            <h3 className="font-sans text-base">Shamim Hosen Limon</h3>
          </div>
          <div className="cursor-pointer ">
            <AddFriendIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLists;
