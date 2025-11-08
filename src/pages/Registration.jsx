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
        <div className="  w-3/4 md:w-2/4 shadow-md flex items-center justify-center rounded-md p-2 md:p-4 gap-x-10 ">
          <div className=" w-[50%] hidden md:block ">
            <Lottie
              className="w-[350px]"
              animationData={registrationAnimation}
              loop={true}
            />
          </div>
          <div className="w-[100%] md:w-[50%]  ">
            <RegistrationForm toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
