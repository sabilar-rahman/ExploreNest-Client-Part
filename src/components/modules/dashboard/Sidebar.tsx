"use client";

import React from "react";

const UserSidebarLinks = [
  {
    item: "User Profile",
    link: "/dashboard/profile",
  },
  { item: "My Posts", link: "/dashboard/posts" },
  {
    item: "Edit My Profile",
    link: "/dashboard/edit-profile",
  },
];

const AdminSidebarLinks = [
  {
    item: "Admin Profile",
    link: "/dashboard/profile",
  },
  { item: "Payment History", link: "admin/dashboard/payment" },
  {
    item: "Posts Management",
    link: "/admin/dashboard/post-management",
  },
  { item: "My Content", link: "/dashboard/my-content" },
  { item: "Bookmark", link: "/dashboard/bookmark" },
  { item: "Edit My Profile", link: "/dashboard/edit-profile" },
  //   {
  //     item: "Change Password",
  //     link: "/dashboard/change-password",
  //   },

  { item: "Home", link: "/" },
];
const Sidebar = () => {
  return (
    <div>
      <h1>Hello,This is Sidebar Route!</h1>
    </div>
  );
};

export default Sidebar;
