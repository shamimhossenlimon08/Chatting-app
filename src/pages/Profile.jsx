import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import Navbar from "../components/navbar/Navbar";
import { useLocation } from "react-router";
import avatarImage from "../assets/avatar-img/avatar-male.jpg";

const Profile = () => {
  const location = useLocation();
  const friend = location.state;

  return (
    <>
      <div>
        <Navbar />
        <div className="h-screen w-full">
          <div className="bg-[rgba(255,252,252,0.5)]  h-[70%] w-full">
            <div className="bg-[rgba(174,173,177,0.5)] h-[60%] w-[70%] mx-auto rounded-b-md"></div>
            <div className="bg-white h-[40%] w-[65%] mx-auto ">
              <div className="flex items-center justify-between">
                <div className="flex gap-x-3 ">
                  <div className=" w-[180px] h-[180px] rounded-[50%] translate-y-[-30%] cursor-pointer object-cover overflow-hidden">
                    <img src={friend?.profile || avatarImage} alt="" />
                  </div>
                  <h3 className=" text-5xl font-semibold mt-6 ">
                    {friend?.name}
                  </h3>
                </div>

                <div className="flex gap-x-6">
                  <button className="bg-[rgba(197,192,192,0.5)] text-xl font-medium font-sans rounded-md py-2 px-5 cursor-pointer">
                    <div className="flex items-center gap-x-2">
                      <FaUserCheck className="text-2xl" />
                      <p>Friends</p>
                    </div>
                  </button>
                  <button className="bg-blue-500 text-white text-xl font-medium font-sans rounded-md py-2 px-5 cursor-pointer">
                    <div className="flex items-center gap-x-2">
                      <RiMessengerFill className="text-2xl" />
                      <p>Message</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[rgba(201,197,197,0.5)] h-screen w-full pt-8 ">
            <div className="bg-white h-full w-[65%]  mx-auto rounded-md "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
