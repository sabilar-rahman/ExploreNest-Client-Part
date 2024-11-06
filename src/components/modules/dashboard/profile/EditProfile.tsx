"use client";

import {
 
    useGetCurrentUserQuery,
    useUpdateUserInfoMutation,
  
} from "@/src/redux/featureApi/auth/authApi";
// import authCurrentUser from "@/src/redux/featureApi/auth/authCurrentUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const userInfo = authCurrentUser();

  const { data: currentUserData, isLoading: currentUserLoading } =useGetCurrentUserQuery({});
  const userData = currentUserData?.data;

  console.log(userData);

  const [updateUser] = useUpdateUserInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      img: "",
    },
  });

  // Reset form values when userData is fetched
  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.name || "",
        email: userData?.email || "",
        img: userData?.img || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data:any) => {
    console.log("Form submitted:", data);
    try {
      // Send updated data to your backend or state management
      await updateUser(data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="edit-profile-container max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Profile Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image URL</label>
          <input
            type="text"
            {...register("img")}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
