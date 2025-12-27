import { baseApi } from "./baseApi";

const coupon = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/coupons?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    addCoupon: builder.mutation({
      query: (data) => {
        return {
          url: "/coupons",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

   



   
  }),
});

export const {
  useAddCouponMutation,
  useDeleteCouponMutation,
  useGetCouponQuery,
  useUpdateFaqMutation,
 
} = coupon;
