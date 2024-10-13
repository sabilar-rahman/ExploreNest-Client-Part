/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, ModalHeader, useDisclosure } from "@nextui-org/react";

// import CustomModal from "../../shared/CustomModal";

import ChangePasswordForm from "./ChangePasswordForm";
import CustomModal from "../../shared/CustomModal";

const ChangePassword = ({ user }: { user: any }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="my-3">
      <CustomModal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalHeader className="p-4">{user?.data?.name} ~ Change Password</ModalHeader>
        <ChangePasswordForm onClose={onClose} />
      </CustomModal>

      <Button size="md" variant="faded" onClick={onOpen}>
        Change Password
      </Button>
    </div>
  );
};

export default ChangePassword;