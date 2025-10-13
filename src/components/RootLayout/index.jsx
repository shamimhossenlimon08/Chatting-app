import React from "react";

import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 ">
        <div className="w-[75%] ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
