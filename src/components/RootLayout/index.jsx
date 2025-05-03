import React from "react";

import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <div className="w-full h-[300px] bg-black"></div>
        <div className="w-4/5 h-[500px]  bg-white absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-md shadow-md">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
