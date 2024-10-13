/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { Avatar, ModalHeader, useDisclosure } from "@nextui-org/react";

import CustomModal from "../../shared/CustomModal";

import CreatePostForm from "./PostCreationForm";

const PostCreation = ({
  user,
  addNewPost,
}: {
  user: any;
  addNewPost?: any;
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="w-full max-w-4xl">
      <CustomModal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalHeader className="p-4">Create post</ModalHeader>
        <CreatePostForm addNewPost={addNewPost} user={user} onClose={onClose} />
      </CustomModal>
      <div
        className="flex items-center p-4 border rounded-md cursor-pointer w-full bg-white-100 shadow-lg gap-4"
        onClick={onOpen}
      >
        <Avatar
          className=" border-black rounded-full"
          size="lg"
          src={user?.data?.img} // Replace with actual profile image URL
        />
        <input
          readOnly
          className="bg-gray-100 rounded-full py-2 px-6 cursor-pointer flex-1 "
          placeholder={`Create your post, ${user?.data?.name}`}
          type="text"
        />
      </div>
    </div>
  );
};

export default PostCreation;