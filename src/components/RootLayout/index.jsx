import React from "react";

import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="relative w-full h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 ">
        <div className=" h-[85%] w-[75%] mx-auto">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
