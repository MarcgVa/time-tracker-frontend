import { api } from "../../app/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ ...payload }) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: ({ ...payload }) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;