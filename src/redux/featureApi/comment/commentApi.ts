import { TApiResponse, TComment } from "@/src/utils";
import { baseApi } from "../../api/baseApi";



const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (payload) => {
        return {
          url: "/comment/create-comment",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["comment", "posts"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => {
        return {
          url: `/comment/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment", "posts"],
    }),
    updateComment: builder.mutation({
      query: (payload) => {
        return {
          url: `/comment/${payload?.commentId}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["comment", "posts"],
    }),
    getMyComment: builder.query({
      query: (params) => {
        return {
          url: `/comment/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TApiResponse<TComment[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["comment"],
    }),
  }),
});

export const {
  useGetMyCommentQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
