/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "sonner";

const cloudinaryImageUpload = async (
  imageFile: File,
): Promise<string | undefined> => {
  const cloudName = "dr7bkozhr";
  const uploadPreset = "imageUpload";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.secure_url;
  } catch (error: any) {
    toast.error("Failed to upload image to Cloudinary");

    return undefined;
  }
};

export default cloudinaryImageUpload;
