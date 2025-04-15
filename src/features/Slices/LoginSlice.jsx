import { createSlice } from "@reduxjs/toolkit";
export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedIn = action.payload;
    },
    logeOutUser: (state) => {
      state.loggedIn = null;
    },
  },
});
export const { loggedInUser, logeOutUser } = LoginSlice.actions;
export default LoginSlice.reducer;
