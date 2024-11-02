import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: "/user/current-user",
        method: "GET",
      }),
      providesTags: ['user']
    })
  }),

});

export const { useLoginMutation, useSignUpMutation, useGetCurrentUserQuery } = authApi;