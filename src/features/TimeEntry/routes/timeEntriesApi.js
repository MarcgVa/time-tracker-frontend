import { api } from "../../../app/api";

export const timeEntriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTimeEntries: builder.query({
      query: (id) => `/projects/${id}/times`,
      providesTags: ["TimeEntries"],
    }),
    getDailyActivity: builder.query({
      query: (id) => `/time/${id}/activity`
    }),
    startTimer: builder.mutation({
      query: ({ id, notes }) => ({
        url: `/time/${id}/start`,
        method: "POST",
        body: { notes },
      }),
      invalidatesTags: ["TimeEntries"],
    }),
    stopTimer: builder.mutation({
      query: (id) => ({
        url: `/time/${id}/stop`,
        method: "PUT",
      }),
      invalidatesTags: ["TimeEntries"],
    }),
  }),
});

export const {
  useGetTimeEntriesQuery,
  useGetDailyActivityQuery,
  useStartTimerMutation,
  useStopTimerMutation,
} = timeEntriesApi;
