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


  getIcon: builder.query({
      query: ({ page, limit, search }) => {
        return {
          url: `/icons?search=${search}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    addicon: builder.mutation({
      query: (data) => {
        return {
          url: "/icons",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    
    deleteicon: builder.mutation({
      query: (id) => {
        return {
          url: `/icons/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateIcon: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/icons/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
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
 useGetIconQuery,
 useAddiconMutation,
 useDeleteiconMutation,
 useUpdateIconMutation,
} = coupon;
