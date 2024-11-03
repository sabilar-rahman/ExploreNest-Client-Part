"use client";

import ENForm from "@/src/components/form/ENForm";
import ENInput from "@/src/components/form/ENInput";
import { title } from "@/src/components/primitives";
import { useSignUpMutation } from "@/src/redux/featureApi/auth/authApi";
import { setUser } from "@/src/redux/featureApi/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";

import registerValidationSchema from "@/src/schemas/register.schema";
import { verifyToken } from "@/src/utils/verifyToken";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const [signUp] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const route = useRouter();

  //   const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  //   useEffect(() => {
  //     if (isPending) {
  //       // Handle Loading satate
  //     }
  //   }, [isPending]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //   try {
    //     const userData = {
    //       ...data,
    //       img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    //     };

    //     console.log("Inside form user data: ", userData);

    //     // handleUserRegistration(userData);

    //     const res = await signUp(userData).unwrap();
    //     const token = res.data?.data?.accessToken;
    //     const decodedToken = await verifyToken(token);

    //     dispatch(
    //       setUser({ user: decodedToken, token: res.data?.data?.accessToken })
    //     );
    //     route.push("/");
    //   } catch (error) {
    //     toast.error("Unable to  to register");
    //   }
    // };

    try {
      const userData = {
        ...data,
        img: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      };

      console.log("Inside form user data: ", userData);

      // handleUserRegistration(userData);

      dispatch(setUser(userData));

      const res = await signUp(userData).unwrap();

      toast.success("Registered Successfully");
      route.push("/");
    } catch (error) {
      toast.error("Unable to  to register");
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">
        Register with{" "}
        <span className={title({ color: "violet" })}>Explore Nest!&nbsp;</span>
      </h3>
      <p className="mb-4">And Share your thoughts</p>
      <div className="w-[35%]">
        <ENForm
          //! Only for development
          defaultValues={{
            name: "abcd",
            email: "abcd@gmail.com",
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
