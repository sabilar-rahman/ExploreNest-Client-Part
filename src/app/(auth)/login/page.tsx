"use client";

import ENForm from "@/src/components/form/ENForm";
import ENInput from "@/src/components/form/ENInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldValues, SubmitHandler } from "react-hook-form";
import loginValidationSchema from "@/src/schemas/login.schemas";
import { title } from "@/src/components/primitives";

const LoginPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">Welcome to <span className={title({ color: "violet" })}>Explore Nest!&nbsp;</span></h3>
     
      <p className="mb-4">Login Here! Let&lsquo;s Get Started</p>

      
      <div className="w-[35%]">
        <ENForm
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
        >
          <div className="py-3">
            <ENInput name="email" label="Email" type="email" />
          </div>
          <div className="py-3">
            <ENInput name="password" label="Password" type="password" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Login
          </Button>
        </ENForm>
        <div className="text-center">
          Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
