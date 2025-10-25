import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./Slices/LoginSlice";
import { ActiveSingleSlice } from "./Slices/ActiveSingleSlice";

const Store = configureStore({
  reducer: {
    login: LoginSlice.reducer,
    active: ActiveSingleSlice.reducer,
  },
});
export default Store;
