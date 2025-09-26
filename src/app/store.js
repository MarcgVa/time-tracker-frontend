import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../routes/auth/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware),
});