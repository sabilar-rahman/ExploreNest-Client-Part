"use client";
import { Input } from "@nextui-org/input";
import { Button, Card } from "@nextui-org/react";
import React, { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import { resetPassword } from "@/src/actions/auth/auth.actions";

const ResetPasswordForm = () => {
  const [state, formAction] = useFormState(resetPassword, null);

  const ref = createRef<HTMLFormElement>();

  //dispatch(createCar(oldData, newFormData));
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message);
      ref.current!.reset();
      window.location.href = "/";
    }
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, ref]);

  return (
    <div className="flex items-center justify-center">
      <Card className="p-6 max-w-lg w-full shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Reset your password
        </h2>
        <form ref={ref} action={formAction} className="space-y-6">
          <Input
            className="w-full"
            label="Enter your email"
            name="email"
            placeholder="youremail@example.com"
            required={true}
            type="email"
          />
          <Input
            className="w-full"
            label="Enter Your password"
            name="password"
            placeholder="new password"
            required={true}
            type="password"
          />
          <Button className="w-full " color="primary" type="submit">
            Submit
          </Button>
          <Toaster />
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;