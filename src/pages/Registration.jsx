import React from "react";
import RegistrationForm from "../components/Registration";
import Lottie from "lottie-react";
import registrationAnimation from "../animation/registration.json";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="w-2/4 shadow-md flex items-center rounded-md p-4 gap-x-10 ">
          <div className=" w-[50%]">
            <Lottie
              className="w-[350px]"
              animationData={registrationAnimation}
              loop={true}
            />
          </div>
          <div className="w-[50%]">
            <RegistrationForm toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
