import React from "react";

import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className=" w-full lg:h-[950px]  xl:h-screen 2xl:h-screen  md:flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50  ">
        <div className=" w-[100%] xl:w-[75%] ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
