"use client";

import ENForm from "@/src/components/form/ENForm";
import ENInput from "@/src/components/form/ENInput";
import { title } from "@/src/components/primitives";

import registerValidationSchema from "@/src/schemas/register.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
//   const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  //   useEffect(() => {
  //     if (isPending) {
  //       // Handle Loading satate
  //     }
  //   }, [isPending]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    console.log("Inside form user data: ", userData);

    // handleUserRegistration(userData);
  };

//   if (isPending) {
//     //  handle loading state
//   }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with <span className={title({ color: "violet" })}>Explore Nest!&nbsp;</span></h3>
      <p className="mb-4">And Share your thoughts</p>
      <div className="w-[35%]">
        <ENForm
          //! Only for development
          defaultValues={{
            name: "Mir Hussain",
            email: "mir@gmail.com",
            // mobileNumber: "01711223344",
            password: "123456",
          }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <ENInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <ENInput label="Email" name="email" size="sm" />
          </div>
          {/* <div className="py-3">
            <ENInput label="Mobile Number" name="mobileNumber" size="sm" />
          </div> */}
          <div className="py-3">
            <ENInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </ENForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
