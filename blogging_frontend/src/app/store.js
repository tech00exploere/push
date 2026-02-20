import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// Load user and token from localStorage
const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: user,
      token: token,
      isLoading: false,
      isError: false,
      error: "",
    },
  },
});
