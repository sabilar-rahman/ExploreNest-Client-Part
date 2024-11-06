"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "sonner";
import { useUpdateCommentMutation } from "@/src/redux/featureApi/comment/commentApi";
import { TComment, TResponse } from "@/src/utils";
import ENForm from "../../form/ENForm";
import ENInput from "../../form/ENInput";


interface IProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  comment: string;
}

const EditComment = ({ isOpen, onClose, commentId, comment }: IProps) => {
  // update comment rtk query
  const [updateComment, { isLoading: updateCommentLoading }] =
    useUpdateCommentMutation();

  const commentUpdateDefaultValue = {
    comment: comment,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updateCommentData = {
      data: {
        ...data,
      },
      commentId,
    };

    try {
      const res = (await updateComment(
        updateCommentData,
      )) as TResponse<TComment>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Comment updated successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      backdrop={"blur"}
      classNames={{
        base: "bg-background",
        header: "border-b border-divider",
        footer: "border-t border-divider",
        closeButton: "hover:bg-default-100 active:bg-default-200",
      }}
      isOpen={isOpen}
      placement="center"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Edit Comment</h2>
            </ModalHeader>
            <ModalBody className="my-8">
              <ENForm
                defaultValues={commentUpdateDefaultValue}
                onSubmit={onSubmit}
              >
                <ENInput label="New Comment" name="comment" />
                <div className="mt-4 flex-1 w-2/6">
                  <Button
                    className="w-full"
                    color="primary"
                    isLoading={updateCommentLoading}
                    size="md"
                    spinner={<Spinner color="current" size="sm" />}
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </ENForm>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditComment;
