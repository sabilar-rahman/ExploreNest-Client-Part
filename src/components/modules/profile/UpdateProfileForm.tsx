"use client";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { Avatar, Button, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

import { updateProfile } from "@/src/actions/profile/profile.action";

const UpdateProfileForm = ({ user, onClose }: { user: any; onClose: any }) => {
  const [state, formAction] = useFormState(updateProfile, null);

  const ref = createRef<HTMLFormElement>();

  //dispatch(createCar(oldData, newFormData));
  useEffect(() => {
    if (state && state.success) {
      ref.current!.reset();
      onClose();
      window.location.href = "/profile";
      toast.success(state.message);
    }
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, ref]);

  return (
    <div className="flex justify-center items-center  bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-gradient-to-br p-8 rounded-lg w-full mx-auto">
        <form
          ref={ref}
          action={formAction}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Profile Image */}
          <div className="relative w-full">
            <Avatar
              className="border-4 border-white mb-4"
              size="lg"
              src={user?.data?.img} // Placeholder or User's current image
            />

            <div className="my-4">
              <Input
                fullWidth
                defaultValue={user?.data?.img}
                label="Picture"
                name="img"
                type="file"
              />
            </div>
          </div>

          {/* Profile Inputs */}
          <div className="space-y-4 w-full">
            <Input
              fullWidth
              defaultValue={user?.data?.name}
              label="Name"
              name="name"
            />
          </div>
          <Button className="w-full mt-4" color="primary" type="submit">
            Save
          </Button>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;