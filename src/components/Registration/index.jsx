import React from "react";

const RegistrationForm = () => {
  return (
    <>
      <div>
        <div className="text-center mb-4 text-2xl">
          <h1 className="font-texturina font-normal ">Registration</h1>
        </div>

        <form>
          <input
            type="text"
            placeholder="Enter your name"
            className=" w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
          />
          <button className="w-full bg-slate-900 text-white text-base rounded-md py-3 font-roboto font-bold">
            Sign Up
          </button>
        </form>
        <p className="text-gray-500 text-base font-roboto mt-5 ">
          Already have an acoount? Sign in
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
