"use client";
import { Button, Card, Input } from "@nextui-org/react";
import React, { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import { forgetPassword } from "@/src/actions/auth/auth.actions";

const ForgetPasswordForm = () => {
  const [state, formAction] = useFormState(forgetPassword, null);

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
    <div className="flex items-center justify-center pt-16">
      <Card className="p-6 max-w-lg w-full shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Reset your password
        </h2>
        <form ref={ref} action={formAction} className="space-y-6">
          <Input
            className="w-full"
            name="email"
            placeholder="youremail@example.com"
            required={true}
            type="email"
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

export default ForgetPasswordForm;