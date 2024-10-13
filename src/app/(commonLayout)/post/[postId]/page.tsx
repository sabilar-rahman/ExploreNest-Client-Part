import React from "react";
import { cookies } from "next/headers";

import { getPostById } from "@/src/actions/post/post.action";
import PostCard from "@/src/components/modules/post/PostCard";
import { getUser } from "@/src/helpers/getUserInfo";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const post: any = await getPostById(postId);
  const token = cookies().get("accessToken");
  const user = await getUser(token as { value: string });

  return (
    <div>
      <PostCard post={post} user={user} />
    </div>
  );
};

export default PostDetailsPage;
