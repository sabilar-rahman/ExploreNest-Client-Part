// import { TApiResponse, TUser } from "@/src/utils";
// import { baseApi } from "../../api/baseApi";

// const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: userInfo,
//       }),
//       // invalidatesTags: ["user"],
//     }),
//     signUp: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/register",
//         method: "POST",
//         body: userInfo,
//       }),
//       // invalidatesTags: ["user"],
//     }),

//     // getCurrentUser: builder.query({
//     //   query: () => {
//     //     return {
//     //       url: "/user/current-user",
//     //       method: "GET",
//     //     };
//     //   },
//     //   // Shape or modify the response before storing it in the Redux cache
//     //   transformResponse: (response: TApiResponse<TUser>) => {
//     //     return {
//     //       data: response.data,
//     //     };
//     //   },

//     //   providesTags: ["user"],
//     // }),
    
//     getCurrentUser: builder.query({
//       query: () => ({
//         url: "/user/current-user",
//         method: "GET",
//       }),
//       // providesTags : ["user"]
//     }),

//     // getMe: builder.query({
//     //   query: () => ({
//     //     method: "GET",
//     //     url: "/users/me",
//     //   }),
//     //   // invalidatesTags : ["products"]
//     // }),


//     // updateUserInfo: builder.mutation<void, { id: string; data: TUser[] }>({
//     //   query: ({id,data}) => {
//     //     return {
//     //       url: `/user/${id}`,
//     //       method: "PUT",
//     //       body: data,
//     //     };
//     //   },
//     //   invalidatesTags: ["user"],
//     // }),
//   }),
// });

// export const { useLoginMutation, useSignUpMutation, useGetCurrentUserQuery ,useUpdateUserInfoMutation } =
//   authApi;


import { TApiResponse, TUser } from "@/src/utils";
import { baseApi } from "../../api/baseApi";



const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    forgetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: { email: userInfo?.email, newPassword: userInfo?.newPassword },
          headers: {
            Authorization: userInfo?.token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),

    getCurrentUser: builder.query({
      query: () => {
        return {
          url: "/user/current-user",
          method: "GET",
        };
      },
      transformResponse: (response: TApiResponse<TUser>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["user"],
    }),
    
    updateUser: builder.mutation({
      query: (payload) => {
        return {
          url: "/user/update-user",
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
    toggleBookMarkPost: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/toggle-bookmark",
          method: "PUT",
          body: userInfo,
        };
      },
      invalidatesTags: ["user", "posts"],
    }),
    toggleFollowUnfollowUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user/toggle-follower",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["user", "posts"],
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
      transformResponse: (response: TApiResponse<TUser[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (payload) => {
        return {
          url: `/user/get-single-user/${payload.userId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TApiResponse<TUser>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["user"],
    }),
    statusToggle: builder.mutation({
      query: (args) => {
        return {
          url: `/user/status-toggle/${args}`,
          method: "PUT",
          body: { args },
        };
      },
      invalidatesTags: ["user"],
    }),

  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useLoginMutation,
  useChangePasswordMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useToggleBookMarkPostMutation,
  useToggleFollowUnfollowUserMutation,
  useUpdateUserMutation,
  useStatusToggleMutation,
} = authApi;
