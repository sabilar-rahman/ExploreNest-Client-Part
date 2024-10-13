"use server";

import { cookies } from "next/headers";

import { getUser } from "@/src/helpers/getUserInfo";
import { uploadImageToIMGBB } from "@/src/helpers/handleImageUpload";
import nexiosInstance from "@/src/config/nexios.config";

export const updateProfile = async (pre: any, formData: any): Promise<any> => {
  try {
    const token = cookies().get("accessToken");
    const user = await getUser(token as { value: string });

    const modifiedFormData = {
      ...Object.fromEntries(formData),
    };
    let profileUpdateDate: any = {};

    if (modifiedFormData?.img.name === "undefined") {
      profileUpdateDate.name = modifiedFormData?.name;
    }
    if (modifiedFormData?.img.name) {
      const image = await uploadImageToIMGBB(modifiedFormData?.img);

      if (image) {
        profileUpdateDate.name = modifiedFormData?.name;
        profileUpdateDate.img = image;
      }
    }
    const response = await nexiosInstance.put(
      `/users/${user?.data?._id}`,
      profileUpdateDate
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyProfile = async (payload: any) => {
  try {
    const response = await nexiosInstance.post(
      "/payment/verifyProfile",
      payload
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};