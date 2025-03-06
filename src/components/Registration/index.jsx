import { useFormik } from "formik";
import React from "react";
import { signUp } from "../../validation/Validation";

const RegistrationForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: console.log("submited"),
    validationSchema: signUp,
  });
  console.log(formik);

  return (
    <>
      <div>
        <div className="text-center mb-4 text-2xl">
          <h1 className="font-texturina font-normal ">Registration</h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            className=" w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className="font-roboto text-red-500 text-sm mb-5">
              {formik.errors.fullName}
            </p>
          )}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="font-roboto text-red-500 text-sm mb-5">
              {formik.errors.email}
            </p>
          )}
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="font-roboto text-red-500 text-sm mb-5">
              {formik.errors.password}
            </p>
          )}

          <button className="w-full bg-slate-900 text-white text-base rounded-md py-3 font-roboto font-bold cursor-pointer">
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
