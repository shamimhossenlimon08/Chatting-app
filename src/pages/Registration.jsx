import React from "react";
import RegistrationForm from "../components/Registration";
import Lottie from "lottie-react";
import registrationAnimation from "../animation/registration.json";

const Registration = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="w-2/4 shadow-md flex items-center rounded-md p-4 gap-x-20 ">
          <div className=" w-[50%]">
            <Lottie animationData={registrationAnimation} loop={true} />
          </div>
          <div className="w-[50%]">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
