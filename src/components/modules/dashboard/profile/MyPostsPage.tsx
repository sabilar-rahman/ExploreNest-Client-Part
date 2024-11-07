"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/modal";
import { IoAddCircleOutline, IoNewspaperOutline } from "react-icons/io5";

import MyPost from "@/src/components/modules/my-post/MyPost";
import CreatePost from "@/src/components/modal/CreatePost";

const MyPostsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="container ms-auto">
      <div className="max-w-5xl w-full mx-auto my-12">
        <div className="p-6 border border-default-200 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold mb-2">
              My Posted Contents : Edit/Delete
            </h2>
            <Button color="success"  onPress={onOpen}>
              Create Post
            </Button>
          </div>

          <div className="space-y-6">
            <MyPost />
          </div>
        </div>
      </div>
      <CreatePost isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default MyPostsPage;
