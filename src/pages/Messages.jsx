import React from "react";

import Chatting from "../components/chatting";
import Friends from "../components/Friends";

const Messages = () => {
  return (
    <>
      <div className=" grid grid-cols-[2fr_4fr] gap-x-3 ">
        <div>
          <Friends />
        </div>
        <div>
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Messages;
