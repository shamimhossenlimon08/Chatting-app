import React from "react";

import Chatting from "../components/chatting";
import Friends from "../components/Friends";

const Messages = () => {
  return (
    <>
      <div className="grid grid-cols-[2fr_4fr] ">
        <div className="w-full ">
          <Friends />
        </div>
        <div className=" w-full  ">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Messages;
