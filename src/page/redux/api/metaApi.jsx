import { baseApi } from "./baseApi";

const meta = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => {
        return {
          url: `/faq`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/faq",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/${id}`,
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

    getbanner: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/banners?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    addBanner: builder.mutation({
      query: (data) => {
        return {
          url: "/banners",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => {
        return {
          url: `/banners/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateBanner: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/banners/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getTerms: builder.query({
      query: () => {
        return {
          url: `/pages/terms`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getPrivecy: builder.query({
      query: () => {
        return {
          url: `/pages/privacy`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAboutus: builder.query({
      query: () => {
        return {
          url: `/pages/about`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getContact: builder.query({
      query: () => {
        return {
          url: `/contact/business-info`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getClientContact: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/contact/messages?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateContact: builder.mutation({
      query: (data) => {
        return {
          url: `/contact/business-info`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteContactClients: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/messages/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateTerms: builder.mutation({
      query: (data) => {
        return {
          url: `/pages/terms`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updatePrivecy: builder.mutation({
      query: (data) => {
        return {
          url: `/pages/privacy`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateAboutUs: builder.mutation({
      query: (data) => {
        return {
          url: `/pages/about`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    readNotification: builder.mutation({
      query: () => {
        return {
          url: `/notifications/read-all`,
          method: "PUT",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getOrder: builder.query({
      query: () => {
        return {
          url: `/orders`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getStatus: builder.query({
      query: () => {
        return {
          url: `/dashboard/stats`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getNotification: builder.query({
      query: () => {
        return {
          url: `/notifications`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getUserGrowth: builder.query({
      query: () => {
        return {
          url: `/dashboard/user-growth`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrderGrowth: builder.query({
      query: () => {
        return {
          url: `/dashboard/order-growth`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getEarningGrowth: builder.query({
      query: () => {
        return {
          url: `/dashboard/earnings-growth`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateOrder: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/orders/${id}/status`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    //     getUserAll: builder.query({
    //       query: ({ page, limit }) => {
    //         return {
    //           url: `/normal-user/get-all-user?page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getUserGrowth: builder.query({
    //       query: (year) => {
    //         return {
    //           url: `/meta/user-chart-data?year=${year}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getBanner: builder.query({
    //       query: ({searchTerm,page,limit}) => {
    //         return {
    //           url: `/banner/get-all?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     addBanner: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/banner/create",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //      deleteBanner: builder.mutation({
    //       query: (id) => {
    //         return {
    //           url: `/banner/delete/${id}`,
    //           method: "DELETE",
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),
    // getFaq: builder.query({
    //             query: () => {
    //                 return {
    //                     url: `/manage/get-faq`,
    //                     method: "GET",
    //                 };
    //             },
    //             providesTags: ["updateProfile"],
    //         }),

    //         addFaq: builder.mutation({
    //             query: (data) => {
    //                 return {
    //                     url: "/manage/add-faq",
    //                     method: "POST",
    //                     body: data,
    //                 };
    //             },
    //             invalidatesTags: ["updateProfile"],
    //         }),

    //         updateFaq: builder.mutation({
    //             query: ({ data, id }) => {
    //                 return {
    //                     url: `/manage/edit-faq/${id}`,
    //                     method: "PATCH",
    //                     body: data,
    //                 };
    //             },
    //             invalidatesTags: ["updateProfile"],
    //         }),

    //         deleteFaq: builder.mutation({
    //             query: (id) => {
    //                 return {
    //                     url: `/manage/delete-faq/${id}`,
    //                     method: 'DELETE'
    //                 }
    //             },
    //             invalidatesTags: ['updateProfile']
    //         }),

    //     getTermsConditions: builder.query({
    //       query: () => {
    //         return {
    //           url: "/manage/get-terms-conditions",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),
    //     postTermsCondition: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/manage/add-terms-conditions",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["terms"],
    //     }),

    //     getPrivecy: builder.query({
    //       query: () => {
    //         return {
    //           url: "/manage/get-privacy-policy",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),

    //     getReports: builder.query({
    //       query: ({searchTerm,page,limit}) => {
    //         return {
    //           url: `/report/all-reports?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),

    //     postPrivecy: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/manage/add-privacy-policy",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["terms"],
    //     }),
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useUpdateContactMutation,
  useGetContactQuery,
  useGetClientContactQuery,
  useDeleteContactClientsMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetbannerQuery,
  useUpdateBannerMutation,
  useGetAboutusQuery,
  useGetPrivecyQuery,
  useGetTermsQuery,
  useUpdateAboutUsMutation,
  useUpdatePrivecyMutation,
  useUpdateTermsMutation,
  useGetStatusQuery,
  useGetUserGrowthQuery,
  useGetOrderGrowthQuery,
  useGetEarningGrowthQuery,
  useGetNotificationQuery,
  useReadNotificationMutation
} = meta;
