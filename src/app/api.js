import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";



const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include", // for auth cookies/jwt
    prepareHeaders: (headers) => {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Company", "Invoices", "Projects", "TimeEntries"],
  endpoints: () => ({}),
});
