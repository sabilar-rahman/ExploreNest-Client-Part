"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

import ENForm from "@/src/components/form/ENForm";


import { useChangePasswordMutation } from "@/src/redux/featureApi/auth/authApi";
import { logout } from "@/src/redux/featureApi/auth/authSlice";

import { useAppDispatch } from "@/src/redux/hooks";
import { TResponse } from "@/src/utils";
import { changePasswordValidationSchema } from "@/src/schemas/password.schema";
import PasswordManageFormInput from "./PasswordManageFormInput";



const PasswordManage = () => {


    const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const passwordData = {
      ...data,
    };

    try {
      const res = (await changePassword(passwordData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Password changed successfully", {
          duration: 2000,
        });

        dispatch(logout());

        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div className='container mx-auto'>
          <div className="container mx-auto py-10">
     
        
        <ENForm
          resolver={zodResolver(changePasswordValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <PasswordManageFormInput
              label="Old Password"
              name="oldPassword"
              type="password"
            />
          </div>

          <div className="py-3">
            <PasswordManageFormInput
              label="New Password"
              name="newPassword"
              type="password"
            />
          </div>

          {/* <div className="py-3">
            <PasswordManageFormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          </div> */}

          <Button
            className=" py-2 mt-4 rounded-lg  font-semibold transition duration-300 transform hover:scale-105 "
            isLoading={changePasswordLoading}
            size="md"
            spinner={<Spinner color="current" size="sm" />}
            type="submit"
          >
           Click to Change Password
          </Button>
        </ENForm>
      </div>
    </div>
  );
};

export default PasswordManage;