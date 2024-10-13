"use server";

import { toast } from "sonner";
import { cookies } from "next/headers";

import nexiosInstance from "@/src/config/nexios.config";
import { uploadImageToIMGBB } from "@/src/helpers/handleImageUpload";
import { getUser } from "@/src/helpers/getUserInfo";
import { getUserByToken } from "@/src/helpers/getUser";

export const register = async (pre: any, formData: any): Promise<any> => {
  try {
    const newFormData = {
      ...Object.fromEntries(formData),
    };
    const image = await uploadImageToIMGBB(newFormData.img);

    if (image) {
      const registerData = {
        name: newFormData?.name,
        email: newFormData?.email,
        password: newFormData?.password,
        img: image,
      };
      const response = await nexiosInstance.post(
        "/auth/register",
        registerData
      );

      return response?.data;
    }
  } catch (error) {
    toast.error("something went wrong!");
  }
};

export const login = async (pre: any, formData: any): Promise<any> => {
  try {
    const newFormData = {
      ...Object.fromEntries(formData),
    };
    const response: any = await nexiosInstance.post("/auth/login", newFormData);

    if (
      response?.data?.data?.accessToken ||
      response?.data?.data?.refreshToken
    ) {
      cookies().set("accessToken", response?.data?.data?.accessToken);
      cookies().set("refreshToken", response?.data?.data?.refreshToken);
      const user = await getUserByToken(response?.data?.data?.accessToken);

      if (user) {
        await nexiosInstance.put(`/auth/last-login/${user?.data?._id}`, {});
      }
    }

    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const changePassword = async (pre: any, formData: any): Promise<any> => {
  try {
    const changePasswordData = {
      ...Object.fromEntries(formData),
    };
    const token = cookies().get("accessToken");
    const user = await getUser(token as { value: string });

    const response = await nexiosInstance.put(
      `/auth/change-password/${user?.data?.email}`,
      changePasswordData
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = async (pre: any, formData: any): Promise<any> => {
  try {
    const forgetPasswordData: any = {
      ...Object.fromEntries(formData),
    };
    const response = await nexiosInstance.post(`/auth/forget-password`, {
      email: forgetPasswordData.email,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (pre: any, formData: any): Promise<any> => {
  console.log(formData);
  try {
    const resetPasswordData = {
      ...Object.fromEntries(formData),
    };
    const response = await nexiosInstance.post("/auth/reset-password", {
      email: resetPasswordData?.email,
      newPassword: resetPasswordData?.password,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};