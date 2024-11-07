"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { CheckIcon } from "lucide-react";
import { Spinner } from "@nextui-org/spinner";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { Badge } from "@nextui-org/badge";
import { useState } from "react";

import {
  useGetCurrentUserQuery,
  useToggleFollowUnfollowUserMutation,
} from "@/src/redux/featureApi/auth/authApi";
import { GoVerified } from "react-icons/go";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const FollowerModal = ({ isOpen, onClose }: IProps) => {
  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({});

  const [handleFollow] = useToggleFollowUnfollowUserMutation();

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const followers = currentUser?.data?.followers;

  // handle follow button function
  const handleFollowToggle = async (id: string) => {
    if (id) {
      setLoadingUserId(id);
      const followData = {
        followingId: id,
      };

      await handleFollow(followData);
      setLoadingUserId(null);
    }
  };

  return (
    <Modal
      backdrop={"blur"}
      classNames={{
        base: "bg-background rounded-lg",
        header: "border-b border-divider",
        footer: "border-t border-divider",
        closeButton: "hover:bg-default-100 active:bg-default-200",
      }}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                {`Followers: ${followers?.length}`}
              </h2>
            </ModalHeader>
            <ModalBody className="my-4">
              {/* Show spinner if loading */}
              {currentUserLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Spinner color="primary" size="lg" />
                </div>
              ) : followers?.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-md text-gray-500 font-semibold">
                    You are not following anyone yet.
                  </p>
                </div>
              ) : (
                followers?.map((user) => (
                  <div
                    key={user?._id}
                    className="flex items-center justify-between mb-2 hover:bg-default-100 p-2 rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Badge
                          isOneChar
                          className={`${user?.isVerified ? "hidden" : ""}`}
                          color="danger"
                          content={<GoVerified/>}
                          placement="top-right"
                          shape="circle"
                          size="lg"
                        >
                          <Avatar
                             radius="sm"
                            alt={user?.name}
                            className="w-10 h-10"
                            color="primary"
                            src={user?.profileImage}

                          />
                        </Badge>
                      </div>
                      <p className="font-semibold text-md text-black dark:text-default-800">
                        {user?.name}
                      </p>
                    </div>

                    {/* follow button */}
                    <Button
                      
                      className={`${
                        user?.followers?.includes(currentUser?.data?._id)
                          ? "bg-success text-white"
                          : "bg-secondary text-white"
                      } flex items-center text-sm`}
                      isLoading={loadingUserId === user?._id}
                     
                      spinner={<Spinner color="white" size="sm" />}
                      onClick={() => handleFollowToggle(user?._id)}
                    >
                      {user?.followers?.includes(currentUser?.data?._id) ? (
                       <p>Unfollow</p>
                      ) : (
                        <p>Follow</p> 
                      )}
                    </Button>
                  </div>
                ))
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FollowerModal;
