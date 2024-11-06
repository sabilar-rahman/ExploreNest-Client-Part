"use client";

import { format } from "date-fns";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  CheckIcon,
  Edit2,
  MapPin,
  MoreVertical,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Spinner } from "@nextui-org/spinner";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { Badge } from "@nextui-org/badge";
import { toast } from "sonner";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";

import EditPost from "../../modal/EditPost";



import { TPost } from "@/src/types";
import { useAppSelector } from "@/src/redux/hooks";
import DetailPageImageGallery from "../../imagegallery/DetailPageImageGallery";
import { TResponse } from "@/src/utils";
import { useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { useDeletePostMutation, useHandleVotingMutation } from "@/src/redux/featureApi/post/postApi";
import { useGetCurrentUserQuery, useToggleBookMarkPostMutation, useToggleFollowUnfollowUserMutation } from "@/src/redux/featureApi/auth/authApi";
// import { TResponse } from "@/src/types";

interface IProps {
  postData: TPost;
}

const PostDetailsCard = ({ postData }: IProps) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // getting current user form redux
  const user = useAppSelector(useCurrentUser);

  // handle vote rtk query
  const [handleVote] = useHandleVotingMutation();

  // handle book mark post rtk query
  const [handleBookMarkPost, { isLoading: handleBookMarkPostLoading }] =
    useToggleBookMarkPostMutation();

  // handle user follow rtk query
  const [handleFollow, { isLoading: handleFollowLoading }] =
    useToggleFollowUnfollowUserMutation();

  const handleFollowToggle = async (id: string) => {
    if (id) {
      const followData = {
        followingId: id,
      };

      await handleFollow(followData);
    }
  };

  const handleUpvote = async (id: string) => {
    const upvoteData = {
      id,
      data: {
        action: "upvote",
      },
    };

    await handleVote(upvoteData);
  };

  const handleDownvote = async (id: string) => {
    const downvoteData = {
      id,
      data: {
        action: "downvote",
      },
    };

    await handleVote(downvoteData);
  };

  const handleShare = async (copiedText: string) => {
    try {
      await navigator.clipboard.writeText(copiedText);
      toast.success("Post link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleBookmark = async (postId: string) => {
    const bookmarkPostData = {
      id: postId,
    };

    await handleBookMarkPost(bookmarkPostData);
  };

  // delete post rtk query hook function

  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async (postId: string) => {
    const toastId = toast.loading("Deleting post...");

    const deletePostData = {
      id: postId,
    };

    try {
      const res = (await deletePost(deletePostData)) as TResponse<TPost>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Post deleted successfully", {
          duration: 2000,
          id: toastId,
        });
        router.push("/dashboard/my-content");
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  const { data: currentUserData } = useGetCurrentUserQuery({});

  const bookmarkedPostId = currentUserData?.data?.bookmarkPosts?.map(
    (item: { _id: any }) => item._id,
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
        <div className="flex justify-between w-full mb-4">
          {/* author details */}
          <div className="flex items-center">
            <div className="relative">
              <Badge
                isOneChar
                className={`${!postData?.author?.isVerified ? "hidden" : ""}`}
                color="success"
                content={<CheckIcon />}
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  isBordered
                  alt={postData?.author?.name}
                  className="w-16 h-16 border-2 border-blue-500"
                  src={postData?.author?.profileImage}
                />
              </Badge>
            </div>
            <div className="ml-4">
              {" "}
              <p className="font-semibold text-lg">{postData?.author?.name}</p>
              <p className="text-sm text-default-500">
                {format(new Date(postData?.createdAt!), "MMM dd, yyyy")}
              </p>
              <p className="text-sm text-default-500">
                Followers: {postData?.author?.followers?.length}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {user?._id !== postData?.author?._id && (
              <Tooltip
                closeDelay={2000}
                color="warning"
                content="Login First"
                isDisabled={user !== null}
              >
                <Button
                  className={`${
                    postData?.author?.followers.includes(user?._id)
                      ? "bg-success text-white"
                      : "bg-primary text-white"
                  } flex items-center rounded-full`}
                  disabled={user === null}
                  isLoading={handleFollowLoading}
                  size="sm"
                  spinner={<Spinner size="sm" />}
                  onClick={() => handleFollowToggle(postData?.author?._id)}
                >
                  {postData?.author?.followers.includes(user?._id) ? (
                    <>
                      <FiUserCheck className="mr-1 w-5 h-5" /> Unfollow
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="mr-1 w-5 h-5" /> Follow
                    </>
                  )}
                </Button>
              </Tooltip>
            )}
            <Tooltip
              closeDelay={2000}
              color="warning"
              content="Login First"
              isDisabled={user !== null}
            >
              <Button
                className={
                  bookmarkedPostId?.includes(postData?._id)
                    ? "text-primary"
                    : "text-default-500"
                }
                disabled={user === null}
                isLoading={handleBookMarkPostLoading}
                size="sm"
                spinner={<Spinner size="sm" />}
                variant="light"
                onClick={() => handleBookmark(postData?._id)}
              >
                {bookmarkedPostId?.includes(postData?._id) ? (
                  <FaBookmark className="w-5 h-5" />
                ) : (
                  <FaRegBookmark className="w-5 h-5" />
                )}
              </Button>
            </Tooltip>
            {user?._id === postData?.author?._id && (
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Comment actions">
                  <DropdownItem
                    key="edit"
                    startContent={<Edit2 className="w-4 h-4" />}
                    onPress={onOpen}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<Trash2 className="w-4 h-4" />}
                    onPress={() => handleDeletePost(postData?._id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
            <EditPost isOpen={isOpen} post={postData} onClose={onClose} />
          </div>
        </div>

        {/* post title */}
        <h1 className="text-3xl font-bold mb-2">{postData?.title}</h1>

        {/* post details */}
        <p className="text-lg text-default-700 dark:text-gray-300 mb-4">
          {postData?.description}
        </p>

        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-default-500 mr-2" />
          <span className="text-default-600">{postData?.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
            {postData?.category}
          </span>
          {postData?.isPremium && (
            <span className="bg-warning/10 text-warning text-sm font-medium px-3 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>
      </CardHeader>

      <Divider />

      {/* image gallery */}
      <CardBody className="px-6 py-4">
        {postData?.images && (
          <DetailPageImageGallery images={postData?.images} />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: postData?.content }}
          className="mt-6 prose dark:prose-invert max-w-none"
        />
      </CardBody>
      <Divider />
      {/* post upvote downvote and share button on the cart foot */}
      <CardFooter className="px-6 py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-4">
            <Tooltip
              closeDelay={2000}
              color="warning"
              content="Login First"
              isDisabled={user !== null}
            >
              <Button
                color={
                  !postData?.upvote?.includes(user?._id || "")
                    ? "default"
                    : "primary"
                }
                disabled={user === null}
                size="sm"
                variant="flat"
                onClick={() => handleUpvote(postData?._id)}
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                <span>{postData?.upvote?.length}</span>
              </Button>
            </Tooltip>
            <Tooltip
              closeDelay={2000}
              color="warning"
              content="Login First"
              isDisabled={user !== null}
            >
              <Button
                color={
                  !postData?.downvote?.includes(user?._id || "")
                    ? "default"
                    : "danger"
                }
                disabled={user === null}
                size="sm"
                variant="flat"
                onClick={() => handleDownvote(postData?._id)}
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                <span>{postData?.downvote?.length}</span>
              </Button>
            </Tooltip>
          </div>
          {/* <div className="relative inline-block">
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              onClick={() =>
                handleShare(
                  `htt/post/${postData?._id}`,
                )
              }
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostDetailsCard;
