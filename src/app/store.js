import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../routes/auth/authSlice";
import invoiceReducer from "../routes/invoices/invoiceSlice";
import companyReducer from "../routes/company/companySlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    invoice: invoiceReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware),
});