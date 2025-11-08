import { useFormik } from "formik";
import React, { useState } from "react";
import { SignIn } from "../../validation/Validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../../features/Slices/LoginSlice";
import { Link, useNavigate } from "react-router";

const LoginForm = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      signInUser();
    },
    validationSchema: SignIn,
  });

  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        if (user.emailVerified === true) {
          setLoading(false);
          dispatch(loggedInUser(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("please verify your email ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error("Email or password is incorrect", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <h1 className="text-center font-roboto font-normal text-xl mb-5">
          Login to your account
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="outline-none border border-slate-400 w-full rounded-md px-3 py-2 mb-3"
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
            className="outline-none border border-slate-400 w-full rounded-md px-3 py-2 mb-3"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="font-roboto text-red-500 text-sm mb-5">
              {formik.errors.password}
            </p>
          )}
          <button
            disabled={loading}
            className="w-full bg-slate-900 rounded-md py-3 text-white text-base font-roboto font-bold cursor-pointer"
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Sign in"}
          </button>
        </form>
        <p className="text-gray-500 font-roboto text-sm md:text-base mt-5">
          Don't have an account?
          <Link to="/registration" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
