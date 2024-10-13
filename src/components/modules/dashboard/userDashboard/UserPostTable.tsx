"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumnsType, TableProps } from "antd";

import React, { useState } from "react";
import { message, Modal, Popconfirm, Table } from "antd";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";

import { deletePost, updatePost } from "@/src/actions/post/post.action";
import ReuseableForm from "@/src/forms/ReusableForm";
import ReuseableInput from "@/src/forms/ReusableInput";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const UserPostTable = ({ posts }: { posts: any }) => {
  // delete confirmation functionalities
  const confirmDelete = async (_id: string) => {
    const res: any = await deletePost(_id);

    if (res?.success) {
      message.success("Post deleted successfully");
    }
  };

  const cancelDelete = () => {
    message.info("post deletion canceled");
  };
  const tableData = posts?.data?.map((post: any) => {
    return {
      key: post?._id,
      author: post?.author?.name,
      title: post?.title,
      category: post?.category,
      upVotes: post?.upVotes,
      content: post?.content,
      premium: post?.premium ? "Premium" : "Free",
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Author",
      key: "name",
      dataIndex: "author",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Content",
      key: "content",
      dataIndex: "content",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "UpVotes",
      key: "upVotes",
      dataIndex: "upVotes",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "premium",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div className="flex items-center gap-3">
            <UpdatePostModal data={item} />

            <Popconfirm
              cancelText="No"
              okText="Yes"
              title="Are you sure to delete this post?"
              onCancel={cancelDelete}
              onConfirm={() => confirmDelete(item?.key)}
            >
              <Button color="danger">Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
        onChange={onChange}
      />
    </div>
  );
};

//update modal
const UpdatePostModal = ({
  data,
}: {
  data: {
    title: string;
    content: number;
    key: string;
  };
}) => {
  const { key, title, content } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Updating...");
    const body = {
      title: value?.title,
      content: value?.content,
    };

    try {
      const res: any = await updatePost({ key, body });

      if (res?.success) {
        setIsModalOpen(false);
        toast.success("Updated Successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Button color="primary" onClick={showModal}>
        Update
      </Button>
      <Modal
        footer={null}
        open={isModalOpen}
        title="Post Update"
        onCancel={handleCancel}
      >
        <ReuseableForm onSubmit={onSubmit}>
          <ReuseableInput
            initialValue={title}
            label="Title"
            name="title"
            type="text"
          />
          <ReuseableInput
            initialValue={content}
            label="Content"
            name="content"
            type="text"
          />

          <Button color="primary" type="submit">
            Update
          </Button>
        </ReuseableForm>
      </Modal>
    </>
  );
};

export default UserPostTable;