"use client";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import { changePassword } from "@/src/actions/auth/auth.actions";
import { handleRemoveCookies } from "@/src/helpers/handleLogout";

const ChangePasswordForm = ({ onClose }: any) => {
  const [state, formAction] = useFormState(changePassword, null);

  const ref = createRef<HTMLFormElement>();

  //dispatch(createCar(oldData, newFormData));
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message);
      ref.current!.reset();
      onClose();
      handleRemoveCookies();
      window.location.href = "/login";
    }
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, ref, onClose]);

  return (
    <div className="flex justify-center items-center  bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Change password</h2>
        <p className="text-gray-500 text-sm mb-4">
          Your password must be at least 6 characters.
        </p>

        <form ref={ref} action={formAction}>
          <div className="mb-4">
            <Input
              className="w-full"
              label="Current password"
              name="oldPassword"
              placeholder="Enter current password"
              required={true}
              type="password"
            />
          </div>

          <div className="mb-4">
            <Input
              className="w-full"
              label="New password"
              name="newPassword"
              placeholder="Enter new password"
              required={true}
              type="password"
            />
          </div>
          <div className="text-blue-500 text-sm mb-4">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Change password
          </Button>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;