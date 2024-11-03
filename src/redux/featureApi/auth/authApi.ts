import { TApiResponse, TUser } from "@/src/utils";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    getCurrentUser: builder.query({
      query: () => {
        return {
          url: "/user/current-user",
          method: "GET",
        };
      },
      // Shape or modify the response before storing it in the Redux cache
      transformResponse: (response: TApiResponse<TUser>) => {
        return {
          data: response.data,
        };
      },

      providesTags: ["user"],
    }),

    // getCurrentUser: builder.query({
    //   query: ({ id }) => ({
    //     url: `/user/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useGetCurrentUserQuery } =
  authApi;
