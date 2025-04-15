import * as Yup from "yup";
export const signUp = Yup.object({
  fullName: Yup.string().min(3).max(10).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "must be use at least a number, and at least a special character"
    )
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "wrong confirm password")
    .required("Please enter your confirm pasword"),
});

export const SignIn = Yup.object({
  email: Yup.string().email().required("please enter your email"),
  password: Yup.string().min(8).required("please enter your password"),
});
