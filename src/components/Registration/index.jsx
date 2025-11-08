import { useFormik } from "formik";
import React, { useState } from "react";
import { signUp } from "../../validation/Validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database";

const RegistrationForm = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      createNewUser();
    },
    validationSchema: signUp,
  });

  const createNewUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: formik.values.fullName,
        })
          .then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast.success("Email sent for verification", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setLoading(false);
              const timeoutId = setTimeout(() => {
                navigate("/login");
              }, 2000);
              return () => clearTimeout(timeoutId);
            });
          })

          .then(() => {
            set(ref(db, "users/" + user.uid), {
              username: user.displayName,
              email: user.email,
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("Email already in use", {
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
        <h1 className=" text-center text-xl md:text-2xl font-texturina font-normal mb-4">
          Registration
        </h1>

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
          <input
            type="password"
            placeholder="Enter your confirm password"
            className="w-full px-2 md:px-3 py-2 border border-slate-400 rounded-md outline-none mb-3 "
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="font-roboto text-red-500 text-sm mb-5">
              {formik.errors.confirmPassword}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white text-base rounded-md py-3 font-roboto font-bold cursor-pointer"
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-500 text-sm md:text-base font-roboto mt-5 ">
          Already have an acoount?
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
