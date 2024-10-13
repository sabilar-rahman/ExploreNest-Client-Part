"use server";

import { revalidateTag } from "next/cache";

import nexiosInstance from "@/src/config/nexios.config";

export const getCommentByPostId = async (id: string) => {
  try {
    const response = await nexiosInstance.get(`/comment/${id}`, {
      next: {
        tags: ["comment"],
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (payload: any) => {
  try {
    const response = await nexiosInstance.post(`/comment/create`, payload);

    revalidateTag("comment");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (content: any, commentId: any) => {
  try {
    const response = await nexiosInstance.put(
      `/comment/update/${commentId}`,
      content
    );

    revalidateTag("comment");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// delete comment
export const deleteComment = async (commentId: string, postId: string) => {
  try {
    const response = await nexiosInstance.delete(
      `/comment/delete/${commentId}/${postId}`
    );

    revalidateTag("comment");

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};