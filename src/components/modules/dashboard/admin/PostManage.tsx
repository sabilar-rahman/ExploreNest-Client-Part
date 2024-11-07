"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { DeleteIcon, EyeIcon } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { toast } from "sonner";



import {
  useDeletePostMutation,
  useGetAllPostQuery,
} from "@/src/redux/featureApi/post/postApi";
import { TPost } from "@/src/types";
import { TResponse } from "@/src/utils";
import Loading from "@/src/components/Loading";
import { CiTrash } from "react-icons/ci";


const columns = [
  { name: "User", uid: "author" },
  { name: "Post Title", uid: "title" },
//   { name: "CATEGORY", uid: "category" },
  { name: "UPVOTE", uid: "upvotes" },
  { name: "DOWNVOTE", uid: "downvotes" },
  { name: "COMMENTS", uid: "commentsCount" },
  { name: "View | Delete", uid: "actions" },
];

const PostManage = () => {
    const { data: postData } = useGetAllPostQuery({});
    const [deleteSinglePost] = useDeletePostMutation();
    const posts = postData?.data as TPost[];
    const router = useRouter();
  
    const [isOpen, setIsOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
    const viewPost = (id: string) => {
      router.push(`/news-feed/post/${id}`);
    };
  
    const openDeleteModal = (id: string) => {
      setPostToDelete(id);
      setIsOpen(true);
    };
  
    const closeDeleteModal = () => {
      setPostToDelete(null);
      setIsOpen(false);
    };
  
    const confirmDelete = async () => {
      const toastId = toast.loading("Deleting post...");
  
      try {
        if (postToDelete) {
          const deletePostData = {
            id: postToDelete,
          };
          const res = (await deleteSinglePost(
            deletePostData,
          )) as TResponse<TPost>;
  
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
          }
        }
      } catch (error) {
        toast.error("Something went wrong", { duration: 2000 });
      } finally {
        closeDeleteModal();
      }
    };
  
    const renderCell = React.useCallback((post: TPost, columnKey: React.Key) => {
      const cellValue = post[columnKey as keyof TPost];
  
      switch (columnKey) {
        case "author":
          return (
            <div className="flex items-center gap-3">
              {/* <Avatar
                className="bg-primary/10 text-primary"
                name={post.author.name}
                size="sm"
                src={post.author.profileImage}
              /> */}
              <p className="font-medium">{post.author.name}</p>
            </div>
          );
        case "title":
          return <p className="font-medium text-default-600">{post.title}</p>;

        case "category":
          return (
            <Chip color="primary" size="sm" variant="flat">
              {post.category}
            </Chip>
          );
        case "upvotes":
          return (
            <p className="font-semibold">{post.upvote?.length}</p>
          );
        case "downvotes":
          return (
            <p className="font-semibold">{post.downvote?.length}</p>
          );
        case "commentsCount":
          return <p className="font-semibold">{post.commentCount}</p>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2 justify-center">
              <Button
                // isIconOnly
                size="sm"
                // variant="light"
                 
                onPress={() => viewPost(post._id)}
              >
                <span className="text-default-600">view post</span>
                {/* <EyeIcon className="w-4 h-4" /> */}
              </Button>
              <Button
                isIconOnly
                color="danger"
                size="md"
                variant="light"
                onClick={() => openDeleteModal(post._id)}
              >
                <CiTrash className="w-10 h-4" />
              </Button>
            </div>
          );
        default:
          if (typeof cellValue === "string" || typeof cellValue === "number") {
            return <p className="text-default-600">{cellValue}</p>;
          } else if (Array.isArray(cellValue)) {
            return (
              <p className="text-default-600">
                {cellValue.length > 0 ? cellValue.join(", ") : "N/A"}
              </p>
            );
          } else {
            return <p className="text-default-600">N/A</p>;
          }
      }
    }, []);
  
    if (!posts) {
      return <Loading />;
    }
  
    if (posts.length === 0) {
      return (
        <div className="text-3xl font-semibold text-center">
          No Post History Available
        </div>
      );
    }
  
    return (
      <>
        <div className="max-w-full overflow-x-auto pt-16">
          <Table
            aria-label="Post table with data from API"
            classNames={{
              base: "min-w-[640px]",
              table: "min-w-full",
              th: "bg-default-100 text-default-800 py-3 px-4",
              td: "py-3 px-4",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  className="text-xs uppercase"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent="No posts to display" items={posts}>
              {(item) => (
                <TableRow key={item._id} className="hover:bg-default-50">
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
  
        <Modal
          classNames={{
            base: "bg-background rounded-lg",
            header: "border-b border-divider",
            footer: "border-t border-divider",
            closeButton: "hover:bg-default-100 active:bg-default-200",
          }}
          isOpen={isOpen}
          placement="center"
          onClose={closeDeleteModal}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Do you want to delete this post?</h2>
            </ModalHeader>
            <ModalBody>
              <p>
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={closeDeleteModal}>
                Cancel
              </Button>
              <Button color="danger" onPress={confirmDelete}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default PostManage;