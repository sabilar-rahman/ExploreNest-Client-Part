"use client";

import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";

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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useGetCurrentUserQuery({});

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const SideLinks =
    user?.data?.data?.role === "admin" ? AdminSidebarLinks : UserSidebarLinks;

  const pathname = usePathname();

  return (
    <div>
      <Button
        isIconOnly
        className="lg:hidden fixed top-4 left-4 "
        size="lg"
        variant="flat"
        onPress={toggleSidebar}
      >
        <MdMenuOpen />
      </Button>
      {isOpen && (
        <button
          className="fixed inset-0 bg-black/50  lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen md:w-72 bg-background border-r  transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-[100vh]">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Button
                isIconOnly
                className="lg:hidden"
                variant="light"
                onPress={closeSidebar}
              ></Button>
            </div>
          </div>

          <nav className="flex-grow overflow-y-auto p-4 space-y-6">
            {/* {SideLinks.map((item) => (
              <Link key={item.link} href={item.link} onClick={closeSidebar}>
                <Button
                  className={`w-full justify-start ${
                    item.link === pathname ? "bg-primary/10 text-primary" : ""
                  }`}
                  startContent={<item.icon size={20} />}
                  variant={item.link === pathname ? "flat" : "light"}
                >
                  {item.item}
                </Button>
              </Link>
            ))} */}

            {SideLinks.map((item) => (
              <Link key={item.link} href={item.link} onClick={closeSidebar}>
                <Button
                  className={`w-full justify-start ${
                    item.link === pathname ? "bg-primary/10 text-primary" : ""
                  }`}
                  variant={item.link === pathname ? "flat" : "light"}
                >
                  {item.item}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
