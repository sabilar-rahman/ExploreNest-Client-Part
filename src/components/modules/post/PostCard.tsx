"use client";
import { Avatar, Button, Card, Divider, Link } from "@nextui-org/react";
import { useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { RiUserFollowFill, RiVerifiedBadgeLine } from "react-icons/ri";

import CommentModal from "../comment/CommentModal";

import { dateFormatter } from "@/src/helpers/dateFormatter";
import { followUser, unfollowUser } from "@/src/actions/user/user.action";
import { downVote, upVote } from "@/src/actions/post/post.action";
import { useReactToPrint } from "react-to-print";

const PostCard = ({ post, user }: { post: any; user: any }) => {
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);
  const [isFollowing, setIsFollowing] = useState(
    user?.data?.following.includes(post?.data?.author?._id)
  );
  // date formatter fn
  const formattedDate = dateFormatter(post?.data?.createdAt);
  //generate pdf
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  // handle follow
  const handleFollow = async (userId: string) => {
    if (isFollowing) {
      // Unfollow logic
      await unfollowUser(userId);
    } else {
      // Follow logic
      await followUser(userId);
    }

    // Toggle follow state
    setIsFollowing(!isFollowing);
  };

  //handle up vote
  const handleUpVote = async (id: string) => {
    // Toggle vote state
    setUserVote(userVote === "upvote" ? null : "upvote");
    await upVote(id);
  };

  //handle down vote
  const handleDownVote = async (id: string) => {
    // Toggle vote state
    setUserVote(userVote === "downvote" ? null : "downvote");
    await downVote(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto gap-4 py-8 md:py-10">
      <Card
        ref={contentRef}
        key={"index"}
        className=" p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Profile Picture */}
            <Avatar
              className=" border-4 border-black rounded-full"
              size="lg"
              src={post?.data?.author?.img} // Replace with actual profile image URL
            />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              {post?.data?.author?.name}{" "}
              {post?.data?.author?.verified && (
                <RiVerifiedBadgeLine className="text-blue-500" />
              )}
            </h3>
          </div>
          {post?.data?.author._id !== user?.data?._id && (
            <Button
              color="primary"
              size="md"
              variant="bordered"
              onClick={() => handleFollow(post?.data?.author?._id)}
            >
              <RiUserFollowFill color="primary" />{" "}
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        {/* Post Title and Date */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {post?.data?.title}
          </h3>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {formattedDate}
          </p>
        </div>

        {/* Post Image (if available) */}
        {post?.data?.image && (
          <div className="my-4">
            <img
              alt={"post.title"}
              className="w-full h-auto rounded-lg"
              src={post?.data?.image}
            />
          </div>
        )}

        {/* Post Content */}
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {post?.data?.content}
        </p>

        <Divider className="my-4 dark:bg-gray-700" />

        {/* Post Interactions */}
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <FaArrowUp
              className={`cursor-pointer ${
                userVote === "upvote" ? "text-blue-600" : "hover:text-blue-600"
              }`}
              onClick={() => handleUpVote(post?.data?._id)}
            />
            <span>{post?.data?.upVotes}</span>
            <FaArrowDown
              className={`cursor-pointer ${
                userVote === "downvote" ? "text-red-600" : "hover:text-red-600"
              }`}
              onClick={() => handleDownVote(post?.data?._id)}
            />
          </div>
          <div>
            <Link className="cursor-pointer" onClick={() => reactToPrintFn()}>
              Print
            </Link>
          </div>
          <div>
            <CommentModal post={post?.data} user={user} />
            <span className="ml-1">
              {post?.data?.comments?.length} Comments
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;