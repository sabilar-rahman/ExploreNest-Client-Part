"use client";
import React, { useState } from "react";
import { ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaComment } from "react-icons/fa6";

//  import CustomModal from "../../shared/CustomModal";

// import CommentSection from "./CommentSection";

import { getCommentByPostId } from "@/src/actions/comment/comment.action";
import CommentSection from "./CommentSection";
import CustomModal from "../../shared/CustomModal";

const CommentModal = ({
  user,
  post,
  setCommentCount,
}: {
  user: any;
  post: any;
  setCommentCount?: any;
}) => {
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleModal = async (id: string) => {
    onOpen();
    const comments: any = await getCommentByPostId(id);

    setComments(comments?.data);
  };

  return (
    <div className="my-3">
      <CustomModal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalHeader className="flex items-center justify-center">
          <h1>{post?.author?.name?.split(" ")[0]}&apos;s post</h1>
        </ModalHeader>
        <CommentSection
          comments={comments}
          post={post}
          setCommentCount={setCommentCount}
          setComments={setComments}
          user={user}
        />
      </CustomModal>

      <div>
        <FaComment
          className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-200"
          onClick={() => handleModal(post?._id)}
        />
      </div>
    </div>
  );
};

export default CommentModal;