import React, { use, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
import { useSelector } from "react-redux";
import avatarImage from "../../assets/avatar-img/avatar-male.jpg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import LiveTime from "../LiveTime";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  uploadBytesResumable,
  ref as Ref,
  getDownloadURL,
} from "firebase/storage";

const Chatting = () => {
  const singleFriend = useSelector((state) => state.active.activeUser);
  const user = useSelector((state) => state.login.loggedIn);
  const [messages, setMessages] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [emojiShow, setEmojiShow] = useState(false);
  const messageEndRef = useRef(null);
  const emojiRef = useRef(null);
  const chooseFile = useRef(null);
  const db = getDatabase();
  const storage = getStorage();

  const handleSendMessage = () => {
    if (!messages.trim()) {
      return;
    }

    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiveName: singleFriend.name,
        whoReceiveId: singleFriend.friendId,
        message: messages,
        // date: `${new Date().getFullYear()}-${
        //   new Date().getMonth() + 1
        // }-${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`, atar poriborte nicer time ti use korte hobe karon eta besi readable
        date: new Date().toISOString(),
        seen: false,
      });
      setMessages("");
    }
    setEmojiShow(false);
  };

  // Press Enter to send function
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // get messages from firebase database
  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      const singleMessageArry = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whoSendId &&
            item.val().whoReceiveId === singleFriend.friendId) ||
          (user.uid === item.val().whoReceiveId &&
            item.val().whoSendId === singleFriend.friendId)
        ) {
          singleMessageArry.push({
            ...item.val(),
            date: item.val().date
              ? new Date(item.val().date).toISOString()
              : null,
          });
        }
      });
      setAllMessages(singleMessageArry);
    });
  }, [singleFriend.friendId]);

  // Date formatting function
  const formatMessengerDate = (date) => {
    const msgDate = moment(date);
    const now = moment();
    if (msgDate.isSame(now, "day")) {
      return msgDate.format("h:mm A");
    } else if (msgDate.isSame(now.clone().subtract(1, "day"), "day")) {
      return "Yesterday, " + msgDate.format("h:mm A");
    } else if (msgDate.isAfter(now.clone().subtract(7, "day"))) {
      return msgDate.format("ddd, h:mm A");
    } else if (msgDate.isSame(now, "year")) {
      return msgDate.format("MMM DD");
    } else {
      return msgDate.format("DD/MM/YYYY");
    }
  };

  // When allMessages is updated, scroll bottom will be instant to show the latest message

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [allMessages]);

  // To show the time only once like Messenger helper function
  const shouldShowTime = (currentMsg, prevMsg) => {
    if (!prevMsg) return true; // first message always show time

    const currentTime = moment(currentMsg.date);
    const prevTime = moment(prevMsg.date);
    const minutesDiff = currentTime.diff(prevTime, "minutes");
    return minutesDiff >= 1 || currentMsg.whoSendId !== prevMsg.whoSendId;
  };

  // Emoji picker functionality

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!emojiRef.current.contains(e.target)) {
        setEmojiShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiSelect = ({ emoji }) => {
    setMessages(messages + emoji);
  };

  // massage image upload functionality

  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0];
    const storageRef = Ref(
      storage,
      `${user.displayName} = sendImageMessage/ ${imgFile}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMessage")), {
            whoSendName: user.displayName,
            whoSendId: user.uid,
            whoReceiveName: singleFriend.name,
            whoReceiveId: singleFriend.friendId,
            message: messages,
            image: downloadURL,
            date: new Date().toISOString(),
            seen: false,
          });
        });
      }
    );
  };

  return (
    <>
      <div className=" h-[800px]">
        <div className="bg-white py-3 px-5 rounded-t-md ">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 overflow-hidden">
              <img
                src={singleFriend?.profile || avatarImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-sans text-xl  text-[#1e1e1e] font-semibold">
              {singleFriend?.name}
            </span>
          </div>
        </div>

        <div className="h-[688px]  bg-[#fbf9f5] px-6 py-3 overflow-y-auto ">
          {singleFriend?.status === "single"
            ? allMessages?.map((item, i) => {
                // To show the time only once like Messenger
                const prevMessage = allMessages[i - 1];
                const showTime =
                  i === allMessages.length - 1 ||
                  shouldShowTime(item, prevMessage);

                return (
                  <div key={i} ref={messageEndRef}>
                    {item.whoSendId === user.uid ? (
                      /* Sender message */
                      item.image ? (
                        <div className="w-[60%]  ml-auto  overflow-hidden">
                          <img
                            src={item.image}
                            alt="cat"
                            className="w-full  object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="w-[60%] ml-auto mb-1">
                          {showTime && (
                            <span className="text-md text-gray-500 mt-1 flex justify-start ml-10">
                              {formatMessengerDate(item.date)}
                            </span>
                          )}

                          <div className="flex flex-col items-end">
                            <p className=" text-white bg-slate-500 text-lg py-2 px-4 rounded-md inline-block">
                              {item.message}
                            </p>
                            {/* To show the time only once like Messenger */}
                            {showTime && i === allMessages.length - 1 && (
                              <LiveTime date={item.date} />
                            )}
                          </div>
                        </div>
                      )
                    ) : /* Receiver message */
                    item.image ? (
                      <div className="w-[60%] mr-auto  overflow-hidden my-3">
                        <img
                          src={item.image}
                          alt="cat"
                          className="w-full  object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-[60%] mr-auto  flex justify-start mb-1">
                        <p className="  bg-[#dadada] text-lg py-2 px-4 rounded-md inline-block">
                          {item.message}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
        <div className=" w-full bg-[#f5f5f5]  rounded-b-md ">
          <div className="relative w-full mx-auto rounded-md py-3 px-2 bg-white flex items-center justify-between box-border">
            <div className="flex items-center gap-x-3 ml-4">
              <div className="relative" ref={emojiRef}>
                <div onClick={() => setEmojiShow(!emojiShow)}>
                  <SmileIcon />
                </div>
                {emojiShow && (
                  <div className="absolute bottom-8 left-0 ">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
              </div>
              <div onClick={() => chooseFile.current.click()}>
                <GalleryIcon />
              </div>
              <input
                type="file"
                hidden
                ref={chooseFile}
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Type a message..."
                className="  py-1 px-1  outline-none w-[660px] absolute top-2 left-23 text-lg "
                onChange={(e) => setMessages(e.target.value)}
                value={messages}
                onKeyDown={handleKeyPress}
              />
            </div>

            <button className="text-2xl mr-2 " onClick={handleSendMessage}>
              <VscSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
