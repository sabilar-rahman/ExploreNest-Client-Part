/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { FaDeleteLeft, FaPaperPlane } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdEditOff } from "react-icons/md";

import {
  createComment,
  deleteComment,
  updateComment,
} from "@/src/actions/comment/comment.action";

const CommentSection = ({
  user,
  comments,
  post,
  setComments,
  setCommentCount,
}: {
  user: any;
  comments: any;
  post: any;
  setComments: any;
  setCommentCount: any;
}) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // State to track which comment is being edited
  const [editContent, setEditContent] = useState<string>("");

  //   post
  const handleCommentCreation = async (e: any) => {
    e.preventDefault();
    const commentData = {
      content: e.target.content.value,
      postId: post?._id,
    };
    const postComment: any = await createComment(commentData);

    if (postComment && postComment?.success) {
      // Add the newly created comment to the existing comments state
      setComments((prevComments: any) => [...prevComments, postComment.data]);
      e.target.reset();
      if (setCommentCount) {
        setCommentCount(postComment?.data?.postId?.comments.length + 1);
      }
    }
  };

  //   handle comment edit
  // Function to handle edit button click
  const handleEditClick = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  //   handle comment update
  const handleUpdateComment = async (e: any, commentId: any) => {
    e.preventDefault();
    const updatedComment = {
      content: editContent,
    };
    const result: any = await updateComment(updatedComment, commentId);

    if (result?.success) {
      // Update the comment in the comments array
      setComments((prevComments: any) =>
        prevComments.map((comment: any) =>
          comment._id === commentId
            ? { ...comment, content: editContent }
            : comment
        )
      );
      setEditingCommentId(null); // Reset edit state after submission
    }
  };

  //delete comment
  const handleDelete = async (commentId: string, postId: string) => {
    const result: any = await deleteComment(commentId, postId);

    if (result?.success) {
      // Remove the comment from the comments array
      setComments((prevComments: any) =>
        prevComments.filter((comment: any) => comment._id !== commentId)
      );
    }
  };

  return (
    <div>
      <div className="comment-section max-h-[60vh] overflow-y-auto p-4">
        {comments.map((comment: any) => {
          const isOwner = comment?.author?._id === user?.data?._id;

          return (
            <div key={comment._id} className="flex flex-col mb-4">
              <div className="flex items-center mb-2">
                <Avatar src={comment?.author?.img} />
                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="font-bold">{comment?.author?.name}</p>
                    <p className="ml-2 text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-700">{comment?.content}</p>
                </div>
              </div>
              {isOwner && (
                <div
                  className={`flex items-center text-gray-500 text-sm space-x-3`}
                >
                  <div className="flex gap-3">
                    <button className="hover:text-blue-600">
                      {editingCommentId === comment?._id ? (
                        <span onClick={() => handleEditClick("", "")}>
                          <MdEditOff /> Cancel
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            handleEditClick(comment._id, comment.content)
                          }
                        >
                          <FaEdit /> Edit
                        </span>
                      )}
                    </button>
                    {editingCommentId === comment._id && (
                      <form
                        onSubmit={(e) => handleUpdateComment(e, comment._id)}
                      >
                        <Input
                          fullWidth
                          endContent={
                            <Button
                              className=" w-2 h-6"
                              color="primary"
                              type="submit"
                            >
                              <FaPaperPlane />
                            </Button>
                          }
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                      </form>
                    )}
                  </div>
                  <button
                    className="hover:text-blue-600"
                    onClick={() => handleDelete(comment?._id, post?._id)}
                  >
                    <FaDeleteLeft /> Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/*  */}
      <div className="sticky bottom-0 flex gap-3">
        <Avatar src={user?.data?.img} />
        <form className="w-full" onSubmit={handleCommentCreation}>
          <Input
            fullWidth
            endContent={
              <Button className=" w-2 h-6" color="primary" type="submit">
                <FaPaperPlane />
              </Button>
            }
            name="content"
            placeholder={`Comment as ${user?.data?.name}`}
          />
        </form>
      </div>
    </div>
  );
};

export default CommentSection;