"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { format } from "date-fns";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/modal";
import { TComment, TResponse } from "@/src/utils";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { useDeleteCommentMutation } from "@/src/redux/featureApi/comment/commentApi";
import EditComment from "./EditComment";

// import { useAppSelector } from "@/src/redux/hook";
// import { useCurrentUser } from "@/src/redux/features/auth/authSlice";
// import { useDeleteCommentMutation } from "@/src/redux/features/comment/commentApi";
// import { TResponse } from "@/src/types";
// import EditCommentModal from "@/src/components/modal/EditCommentModal";
// import { TComment } from "@/src/types/comment.type";

interface IProps {
  comment: TComment;
}

const CommentCardDetails = ({ comment }: IProps) => {
  const user = useAppSelector(useCurrentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // delete comment rtk query
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (commentId: string) => {
    const toastId = toast.loading("Deleting comment...");

    try {
      const res = (await deleteComment(commentId)) as TResponse<TComment>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Comment deleted successfully", {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div className="flex items-start">
      <Avatar
       isBordered
        alt={comment?.commenter?.name}
         className="mr-4"
        
        
         radius="sm"
        src={comment?.commenter?.profileImage}
      />
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-lg">{comment?.commenter?.name}</p>
          <div className="flex items-center">
            <p className="text-sm text-default-500 mr-2">
              {format(new Date(comment?.createdAt), "dd-MMM-yyyy HH:mm")}
            </p>
            {user?._id.toString() === comment?.commenter?._id?.toString() && (
              <>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Comment actions">
                    <DropdownItem
                      key="edit"
                      // startContent={<Edit2 className="w-4 h-4" />}
                      onPress={onOpen}
                    >
                      Edit Comment
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      // startContent={<Trash2 className="w-4 h-4" />}
                      onPress={() => handleDeleteComment(comment?._id)}
                    >
                      Delete Comment
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <EditComment
                  comment={comment?.comment}
                  commentId={comment?._id}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </>
            )}
          </div>
        </div>
        <p className="text-default-800 dark:text-gray-300 text-base leading-relaxed">
          {comment?.comment}
        </p>
      </div>
    </div>
  );
};

export default CommentCardDetails;
