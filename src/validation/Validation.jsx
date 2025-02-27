import * as Yup from "yup";
export const signUp = Yup.object({
  fullName: Yup.string().min(3).max(10).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});
