"use client";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

// import SocialLogin from "./SocialLogin";

import { register } from "@/src/actions/auth/auth.actions";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, null);

  const ref = createRef<HTMLFormElement>();

  //dispatch(createCar(oldData, newFormData));
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message);
      ref.current!.reset();
      window.location.href = "/login";
    }

    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, ref]);

  return (
    <form ref={ref} action={formAction}>
      <h1 className="text-3xl font-bold">Create Account</h1>
      <div className="social-icons">
        <SocialLogin />
      </div>
      <span>or use your email for registration</span>
      <input name="name" placeholder="Name" required={true} type="text" />
      <input name="email" placeholder="Email" required={true} type="email" />
      <input
        name="password"
        placeholder="Password"
        required={true}
        type="password"
      />
      <input
        name="img"
        placeholder="Input your picture"
        required={true}
        type="file"
      />
      <Toaster />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterForm;