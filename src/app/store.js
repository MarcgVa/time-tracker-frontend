import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../routes/auth/authSlice";
import invoiceReducer from "../routes/invoices/invoiceSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    invoice: invoiceReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware),
});