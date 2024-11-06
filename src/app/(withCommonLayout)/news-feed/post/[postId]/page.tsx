"use client";

import Loading from "@/src/components/Loading";
import PremiumCard from "@/src/components/modal/premiumcard/PremiumCard";
import Comment from "@/src/components/modules/comment/Comment";
import PostDetailsCard from "@/src/components/modules/post/PostDetailsCard";
import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { useGetMyCommentQuery } from "@/src/redux/featureApi/comment/commentApi";
import { useGetSinglePostQuery } from "@/src/redux/featureApi/post/postApi";
import { Divider, Spinner } from "@nextui-org/react";


interface IProps {
  params: {
    postId: string;
  };
}

export default function PostDetails({ params }: IProps) {
  const { data: currentUserData } = useGetCurrentUserQuery({});

  // getting single post data
  const { data: postData, isLoading: postLoading } = useGetSinglePostQuery(
    params.postId
  );

  // getting comments for that individual post
  const { data: commentData, isLoading: commentLoading } = useGetMyCommentQuery(
    postData?.data?._id,
    {
      skip: postLoading,
    }
  );

  const isPremiumAndNotVerified =
    postData?.data?.isPremium && !currentUserData?.data?.isVerified;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {postLoading ? (
        <Loading />
      ) : (
        // <div>
        //   {isPremiumAndNotVerified && <PremiumCard />}
        //   <PostDetailsCard postData={postData?.data!} />
        // </div>

        <div>
          {isPremiumAndNotVerified && <PremiumCard />}
          <PostDetailsCard postData={postData?.data!} />
        </div>
      )}

      <Divider className="my-8" />
      {postLoading || commentLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <Comment commentData={commentData?.data!} />
      )}
    </div>
  );
}
