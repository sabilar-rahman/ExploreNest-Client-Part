"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumnsType, TableProps } from "antd";

import React from "react";
import { Table } from "antd";
import { Button } from "@nextui-org/button";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const ContentTable = ({ posts }: { posts: any }) => {
  const tableData = posts?.data?.map((post: any) => {
    return {
      key: post?._id,
      author: post?.author?.name,
      title: post?.title,
      category: post?.category,
      upVotes: post?.upVotes,
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
          <div>
            <Button color="danger">Delete</Button>
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
        loading={posts?.data?.length === 0}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
        onChange={onChange}
      />
    </div>
  );
};

export default ContentTable;