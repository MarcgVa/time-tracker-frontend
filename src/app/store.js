import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../features/Auth/routes/authSlice";
import invoiceReducer from "../features/Invoices/routes/invoiceSlice";
import companyReducer from "../features/Company/routes/companySlice";
import timeReducer from "../features/TimeEntry/routes/timeSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    invoice: invoiceReducer,
    company: companyReducer,
    time: timeReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
  devTools: import.meta.env.VITE_DEV === "dev" ? true : false,
});
