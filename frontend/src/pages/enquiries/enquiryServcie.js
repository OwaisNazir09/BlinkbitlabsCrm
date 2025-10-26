import apiSlice from "../../features/api/apiSlice";

export const enquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnquiries: builder.query({
      query: () => "/enquiries",
      providesTags: ["Enquiry"],
    }),
    getEnquiryById: builder.query({
      query: (id) => `/enquiries/${id}`,
      providesTags: ["Enquiry"],
    }),
    addEnquiry: builder.mutation({
      query: (data) => ({
        url: "/enquiries/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Enquiry"],
    }),
    updateEnquiry: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/enquiries/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Enquiry"],
    }),
    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/enquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const {
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useAddEnquiryMutation,
  useUpdateEnquiryMutation,
  useDeleteEnquiryMutation,
} = enquiryApi;
