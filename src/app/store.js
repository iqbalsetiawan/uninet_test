import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const preloadedState = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return { auth: { user: JSON.parse(user) } };
  }
  return {};
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: preloadedState(),
});
