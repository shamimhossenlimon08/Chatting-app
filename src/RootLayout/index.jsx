import React from "react";

import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <div className="w-full h-[300px] bg-black"></div>
        <div className="w-2/3 h-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-md ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
