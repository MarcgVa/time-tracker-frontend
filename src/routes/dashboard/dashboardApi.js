import { api } from "../../app/api";

const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectDashboardInfo: builder.query({
      query: () => ({
        url: "/projects/dashboard",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    getInvoiceDashboardInfo: builder.query({
      query: () => ({
        url: "/invoices/dashboard",
        method: "GET",
      }),
      providesTags: ["Invoices"],
    }),
    getCompanyDashboardInfo: builder.query({
      query: () => ({
        url: "/companies/dashboard",
        method: "GET",
      }),
      providesTags: ["Companies"],
    }),
    getUserDashboardInfo: builder.query({
      query: () => ({
        url: "/users/dashboard",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetProjectDashboardInfoQuery, useGetInvoiceDashboardInfoQuery, useGetCompanyDashboardInfoQuery, useGetUserDashboardInfoQuery 
} = dashboardApi;

