import { api } from "../../app/api";

export const invoicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (projectId) => ({
        url: `/invoice/${projectId}/invoices`,
        method: 'GET',
      }),
      providesTags: ["Invoices"],
    }),
    getInvoice: builder.query({
      query: (id) => ({
        url: `/invoice/${id}`,
        method: 'GET',
      }),
      providesTags: ["Invoices"],
    }),
    getInvoiceDetails: builder.query({
      query: (id) => ({
        url: `/invoice/${id}/details`,
        method: 'GET',
      }),
      providesTags: ["Invoices"],
    }),
    createInvoice: builder.mutation({
      query: (projectId) => ({
        url: "/invoice",
        method: "POST",
        body: projectId,
      }),
      invalidatesTags: ["Invoices"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoice/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Invoices"],
    }),
  }),
});

export const { useGetInvoicesQuery, useCreateInvoiceMutation, useGetInvoiceDetailsQuery } = invoicesApi;
