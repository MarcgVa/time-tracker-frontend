import { api } from "../../app/api";

export const timeEntriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTimeEntries: builder.query({
      query: (projectId) => `/projects/${projectId}/times`,
      providesTags: ["TimeEntries"],
    }),
    startTimer: builder.mutation({
      query: ({ projectId, notes }) => ({
        url: `/projects/${projectId}/start`,
        method: "POST",
        body: notes,
      }),
      invalidatesTags: ["TimeEntries"],
    }),
    stopTimer: builder.mutation({
      query: (id) => ({
        url: `/time/${id}/stop`,
        method: "PUT"
      }),
      invalidatesTags: ["TimeEntries"],
    }),
  }),
});

export const {
  useGetTimeEntriesQuery,
  useStartTimerMutation,
  useStopTimerMutation,
} = timeEntriesApi;
