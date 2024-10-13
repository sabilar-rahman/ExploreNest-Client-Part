/* eslint-disable no-console */
"use server";

import { revalidateTag } from "next/cache";

import nexiosInstance from "@/src/config/nexios.config";

// create post
export const createPost = async (payload: any) => {
  try {
    const response = await nexiosInstance.post("/post/create", payload);

    revalidateTag("posts");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get user specific post
export const getUserPost = async (id: string) => {
  try {
    const response = await nexiosInstance.get(`/post/${id}`, {
      next: {
        tags: ["posts"],
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get all user post
export const getAllPost = async ({
  page,
  limit = 3,
  category,
  searchTerm,
  sortBy,
}: {
  page: any;
  limit: any;
  category: any;
  searchTerm: any;
  sortBy: any;
}): Promise<any> => {
  try {
    const params = new URLSearchParams();

    if (page) {
      params.append("page", page);
    }
    if (limit) {
      params.append("limit", limit);
    }
    if (searchTerm) {
      params.append("searchTerm", searchTerm);
    }
    if (category) {
      params.append("category", category);
    }
    if (sortBy) {
      params.append("sort", sortBy);
    }
    const response: any = await nexiosInstance.get(`/post`, {
      params: params,
      next: {
        tags: ["posts"],
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log(error);

    return { posts: [], totalPages: 0 };
  }
};

// upvote
export const upVote = async (id: string) => {
  try {
    const response = await nexiosInstance.post(`/post/upvote/${id}`, {});

    revalidateTag("posts");

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// down vote
export const downVote = async (id: string) => {
  try {
    const response = await nexiosInstance.post(`/post/downvote/${id}`, {});

    revalidateTag("posts");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get user by Id
export const getPostById = async (postId: string) => {
  try {
    const result = await nexiosInstance.get(`/post/getPost/${postId}`, {
      next: {
        tags: ["posts"],
      },
    });

    return result?.data;
  } catch (error) {
    console.log(error);
  }
};

// get table post
export const getTablePostData = async () => {
  try {
    const tablePostData = await nexiosInstance.get(
      "/post/get-all-posts/tableData",
      {
        next: {
          tags: ["posts"],
        },
      }
    );

    return tablePostData?.data;
  } catch (error) {
    // console.log("error =>", error);
  }
};

// delete post
export const deletePost = async (id: string) => {
  try {
    const res = await nexiosInstance.delete(`/post/${id}`);

    revalidateTag("posts");

    return res?.data;
  } catch (error) {
    console.log("error =>", error);
  }
};

// update post
export const updatePost = async ({ key, body }: { key: string; body: any }) => {
  try {
    const res = await nexiosInstance.put(`/post/update/${key}`, body);

    revalidateTag("posts");

    return res?.data;
  } catch (error) {
    console.log("error =>", error);
  }
};