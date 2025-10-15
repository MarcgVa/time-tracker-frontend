import { api } from "../../../app/api";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyList: builder.query({
      query: () => ({
        url: "/company",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),
    getCompany: builder.query({
      query: (id) => ({
        url: `/company/${id}`,
        method: "GET",
      }),
      providesTags: ["Company"],
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: "/company/new",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, body }) => ({
        url: `/company/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: ({ id }) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyListQuery,
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
