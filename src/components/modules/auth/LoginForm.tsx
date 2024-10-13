"use client";
import React, { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

import SocialLogin from "./SocialLogin";

import { login } from "@/src/actions/auth/auth.actions";

const LoginForm = () => {
  // handle form submit
  const [state, formAction] = useFormState(login, null);

  const ref = createRef<HTMLFormElement>();

  //dispatch(createCar(oldData, newFormData));
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message, { duration: 5000 });
      ref.current!.reset();
      window.location.href = "/";
    }

    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, ref]);

  return (
    <form ref={ref} action={formAction}>
      <h1 className="text-3xl font-bold">Sign In</h1>
      <div className="social-icons">
        <SocialLogin />
      </div>
      <span>or use your email password</span>
      <input name="email" placeholder="Email" required={true} type="email" />
      <input
        name="password"
        placeholder="Password"
        required={true}
        type="password"
      />
      <Link className="mr-0" color="primary" href="/forgot-password">
        Forget Password
      </Link>
      <Toaster />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;