"use client";

import { Button, ModalHeader, useDisclosure } from "@nextui-org/react";

// import CustomModal from "../../shared/CustomModal";

import UpdateProfileForm from "./UpdateProfileForm";
import CustomModal from "../../shared/CustomModal";

const UpdateUserProfile = ({ user }: { user: any }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="my-3">
      <CustomModal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalHeader className="p-4">Update Profile</ModalHeader>
        <UpdateProfileForm user={user} onClose={onClose} />
      </CustomModal>

      <Button className="text-white" color="primary" onClick={onOpen}>
        Edit profile
      </Button>
    </div>
  );
};

export default UpdateUserProfile;