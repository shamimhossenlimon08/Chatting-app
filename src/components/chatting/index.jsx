import React from "react";
import { VscSend } from "react-icons/vsc";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";

const Chatting = () => {
  return (
    <>
      <div className=" mx-3 ">
        <div className="bg-[#212121] py-4 px-6">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 overflow-hidden"></div>
            <h3 className="font-sans text-base text-white">
              Shamim Hosen Limon
            </h3>
          </div>
        </div>
        <div className="h-[257px] px-4 bg-[#FBFBFB] ">dsghh</div>
        <div className="bg-[#f5f5f5] py-4 rounded-md">
          <div className="w-[576px] mx-auto rounded-md py-2 px-2 bg-white flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <SmileIcon />
              <GalleryIcon />
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-[450px] py-1 px-1 outline-none  "
            />
            <button className="text-2xl ">
              <VscSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
