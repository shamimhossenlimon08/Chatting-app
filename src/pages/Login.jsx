import React from "react";
import LoginForm from "../components/Login";
import Lottie from "lottie-react";
import loginAnimation from "../animation/login.json";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-2/4 flex items-center rounded-md shadow-md gap-x-10 p-4 ">
          <div className="w-[50%] ">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <div className="w-[50%] ">
            <LoginForm toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
