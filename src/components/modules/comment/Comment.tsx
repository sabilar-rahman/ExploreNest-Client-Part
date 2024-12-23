"use client";
import { Button } from "@nextui-org/button";
import { MessageCircle, Send } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";

// import CommentCard from "./CommentCard";



import { useAddCommentMutation } from "@/src/redux/featureApi/comment/commentApi";
import ENTextArea from "@/src/components/form/ENTextArea";
// import ENForm from "@/src/components/form/ENForm";
// import { TComment } from "@/src/types/comment.type";
import { TComment, TResponse } from "@/src/utils";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import CommentCardDetails from "./CommentCardDetails";
import ENForm from "../../form/ENForm";
import { commentValidationSchema } from "@/src/schemas";
import { FaRegCommentDots } from "react-icons/fa";



interface IProps {
  commentData: TComment[];
}

const Comment = ({ commentData }: IProps) => {
  // getting current user form redux
  const user = useAppSelector(useCurrentUser);
  const { postId } = useParams();

  const [addComment, { isLoading }] = useAddCommentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const comment = {
      post: postId,
      ...data,
    };

    try {
      const res = (await addComment(comment)) as TResponse<TComment>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Comment posted successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <Card className="w-full bg-background shadow-md">
      <CardHeader className="flex flex-col items-start px-6 ">
        <div className="flex items-center w-full ">
          <FaRegCommentDots className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-2xl font-bold">
             ({commentData.length})
          </h2>
        </div>
        <div className="w-full">
          <ENForm
            resetOnSubmit={true}
            resolver={zodResolver(commentValidationSchema)}
            onSubmit={onSubmit}
          >
            <ENTextArea label="comment here" name="comment" />
            <div className="flex justify-end ">
              <Tooltip
                closeDelay={2000}
                color="danger"
                content="You need to login first!"
                isDisabled={user !== null}
              >
                <Button
                  className="px-6"
                  color="warning"
                  disabled={user === null}
                  isLoading={isLoading}
                  spinner={<Spinner color="success" size="sm" />}
                  // startContent={<Send className="w-4 h-4" />}
                  type="submit"
                >
                 Click to post comment
                </Button>

              </Tooltip>
            </div>
          </ENForm>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="px-6 py-4 overflow-y-auto max-h-[500px]">
        {commentData.map((comment, index) => (
          <div key={comment._id} className="w-full mb-6 last:mb-0">
            <CommentCardDetails comment={comment} />
            {index < commentData.length - 1 && <Divider className="my-6" />}
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default Comment;
