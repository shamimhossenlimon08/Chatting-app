import React, { useState } from "react";

import Chatting from "../components/chatting";
import Friends from "../components/Friends";

const Messages = () => {
  const [activeFriend, setActiveFriend] = useState(null);

  return (
    <>
      <div className="  md:flex md:w-[100%] md:space-x-3">
        <div className="hidden md:block md:w-[50%] ">
          <Friends />
        </div>
        <div className="hidden md:block md:w-[50%]  ">
          <Chatting />
        </div>
      </div>
      <div className="block md:hidden">
        {!activeFriend && (
          <div>
            <Friends onFriendClick={setActiveFriend} />
          </div>
        )}
        {activeFriend && (
          <div className="">
            <Chatting
              friend={activeFriend}
              onBack={() => setActiveFriend(null)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
