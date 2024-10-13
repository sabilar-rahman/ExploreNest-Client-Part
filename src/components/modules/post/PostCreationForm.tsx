"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { Checkbox } from "@nextui-org/react";
import { Controller, FieldValues } from "react-hook-form";
import { Form, Input } from "antd";

import { uploadImageToIMGBB } from "@/src/helpers/handleImageUpload";
import { categories } from "@/src/constant/postCategories";
import { createPost } from "@/src/actions/post/post.action";
import ReuseableForm from "@/src/forms/ReusableForm";
import ReuseableInput from "@/src/forms/ReusableInput";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePostForm = ({
  onClose,
  user,
  addNewPost,
}: {
  onClose: any;
  user: any;
  addNewPost?: any;
}) => {
  const [content, setContent] = useState("");
  const [premium, setIsPremium] = useState(false);

  const [category, setCategory] = useState("");

  // handle creating form
  const onSubmit = async (data: FieldValues) => {
    let postData: any = {};

    // upload image fn
    if (data?.image) {
      const uploadedImage = await uploadImageToIMGBB(data.image);

      if (uploadedImage) {
        postData.image = uploadedImage;
      }
    }
    if (premium) {
      postData.premium = premium;
    }
    postData.title = data?.title;
    postData.content = content.replace(/<[^>]+>/g, "");
    postData.category = category;
    postData.author = user?.data?._id;
    // call create post api
    const creatingPost: any = await createPost(postData);

    // showing success or error message
    if (creatingPost && creatingPost.success) {
      toast.success(creatingPost.message, { duration: 5000 });
      // After successful post creation, call the callback to add it to the newsfeed
      // Check if the `newPost` function is passed
      if (typeof addNewPost === "function") {
        addNewPost(creatingPost?.data); // Call `newPost` function if it's passed
      } else {
        console.log("newPost function is undefined, skipping.");
      }
      // addNewPost(creatingPost?.data);
      onClose();
    }
    if (creatingPost && !creatingPost.success) {
      toast.error(creatingPost.message);
    }
  };

  return (
    <>
      <ReuseableForm onSubmit={onSubmit}>
        <ReuseableInput
          label="Title"
          name="title"
          required={true}
          type="text"
        />
        <ReactQuill
          placeholder="What's on your mind?"
          style={{ marginBottom: "12px" }}
          value={content}
          onChange={setContent}
        />
        <select
          className="border rounded p-2 w-full mb-2"
          required={true}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat.name} value={cat.value}>
              {cat.value}
            </option>
          ))}
        </select>
        <Controller
          name="image"
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <Form.Item label="Picture">
              <Input
                type="file"
                value={value?.fileName}
                {...field}
                onChange={(e) => onChange(e.target.files?.[0])}
              />
              <div>
                {error && (
                  <small style={{ color: "red" }}>{error.message}</small>
                )}
              </div>
            </Form.Item>
          )}
        />
        {user?.data?.verified && (
          <div>
            <Checkbox
              disabled={user?.data?.verified}
              defaultSelected={false}
              onChange={(e) => setIsPremium(e.target.checked)}
            >
              Premium
            </Checkbox>
            <br /> <br />
          </div>
        )}

        <Toaster />
        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full"
          type="submit"
        >
          Post
        </button>
      </ReuseableForm>
    </>
  );
};

export default CreatePostForm;