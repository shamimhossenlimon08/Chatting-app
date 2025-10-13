import React from "react";
import { VscSend } from "react-icons/vsc";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
import demoChatImg from "../../assets/image/nature.jpg";

const Chatting = () => {
  return (
    <>
      <div className=" h-[800px]">
        <div className="bg-[#dfdfdf] py-3 px-5 rounded-t-md ">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 overflow-hidden"></div>
            <h3 className="font-sans text-xl  text-[#1e1e1e] font-semibold">
              Shamim Hosen Limon
            </h3>
          </div>
        </div>

        <div className="h-[688px]  bg-[#FBFBFB] px-6 py-3 overflow-y-auto ">
          {/* sender messages */}
          <div className="w-[60%] ml-auto flex justify-end">
            <p className=" text-white bg-slate-500 text-lg py-2 px-4 rounded-md inline-block">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
              obcaecati nam dolorem corrupti, dolorum voluptatibus ducimus nihil
              quas officiis tempora non laboriosam labore doloremque sequi fugit
              autem eveniet quaerat incidunt in. Dolorem velit delectus eveniet
              ad voluptates, nam inventore laudantium debitis ex necessitatibus
              laboriosam provident fugit incidunt, fugiat ducimus id?
            </p>
          </div>
          {/* receiver messages */}
          <div className="w-[60%] mr-auto my-3 flex justify-start ">
            <p className=" text-white bg-slate-500 text-lg py-2 px-4 rounded-md inline-block">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              dignissimos possimus soluta vel quibusdam quidem voluptas
              necessitatibus facilis, laboriosam optio id doloremque saepe,
              expedita quo ea mollitia voluptate, non quasi numquam accusantium
              corporis recusandae porro praesentium? Earum alias, reprehenderit
              magni exercitationem ab facere vero, ea, quibusdam labore
              molestias ex voluptates!
            </p>
          </div>

          {/* sender messages */}
          <div className="w-[60%]  ml-auto  overflow-hidden">
            <img
              src={demoChatImg}
              alt="cat"
              className="w-full  object-cover rounded-md"
            />
          </div>
          {/* receiver messages */}
          <div className="w-[60%] mr-auto  overflow-hidden my-3">
            <img
              src={demoChatImg}
              alt="cat"
              className="w-full  object-cover rounded-md"
            />
          </div>
        </div>
        <div className=" w-full bg-[#f5f5f5]  rounded-b-md ">
          <div className="relative w-full mx-auto rounded-md py-3 px-2 bg-white flex items-center justify-between box-border">
            <div className="flex items-center gap-x-3 ml-4">
              <SmileIcon />
              <GalleryIcon />
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Type a message..."
                className=" py-1 px-1  outline-none w-[660px] absolute top-2 left-23  "
              />
            </div>

            <button className="text-2xl mr-2 ">
              <VscSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
