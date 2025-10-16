import { api } from "../../../app/api";


const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
