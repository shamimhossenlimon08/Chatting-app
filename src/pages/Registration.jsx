import React from "react";
import RegistrationForm from "../components/Registration";

const Registration = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="w-2/4 shadow-md flex items-center rounded-md p-4 gap-x-4 ">
          <div className="bg-amber-800 w-[50%]">animation</div>
          <div className="w-[50%]">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
