"use client";


import { useGetCurrentUserPostQuery } from "@/src/redux/featureApi/post/postApi";

import Loading from "../../Loading";
import { TPost } from "@/src/types";
import PostCard from "../post/PostCard";

const MyPost = () => {
  const { data: postData, isLoading: postDataLoading } =
    useGetCurrentUserPostQuery({});

  return (
    <div>
      {postDataLoading && <Loading />}

      <div className="flex flex-col gap-6 my-6">
        {postData?.data?.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              You have not posted anything yet!
            </h2>
            <p className="text-gray-800 dark:text-gray-200 mt-2">
              Create your first post to share with others.
            </p>
          </div>
        ) : (
          postData?.data?.map((post: TPost) => (
            <PostCard key={post?._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyPost;
