import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/Auth/routes/authSlice";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include", // for auth cookies/jwt
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  } else if (result?.error?.originalStatus === 401) {
    console.log("Unauthorized! Logging out...");
    // const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    // try to get a new token

    api.dispatch(logout());
    // retry the original query with new token
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Company", "Invoices", "Projects", "TimeEntries"],
  endpoints: () => ({}),
});
