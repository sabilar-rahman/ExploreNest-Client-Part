// "use client";

// import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
// import { useAppDispatch } from "@/src/redux/hooks";
// import { Button } from "@nextui-org/button";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { MdMenuOpen } from "react-icons/md";

// const UserSidebarLinks = [
//   {
//     item: "User Profile",
//     link: "/dashboard/profile",
//   },
//   { item: "My Posts", link: "/dashboard/posts" },
//   {
//     item: "Edit My Profile",
//     link: "/dashboard/edit-profile",
//   },
// ];

// const AdminSidebarLinks = [
//   {
//     item: "Admin Profile",
//     link: "/dashboard/profile",
//   },
//   { item: "Payment History", link: "admin/dashboard/payment" },
//   {
//     item: "Posts Management",
//     link: "/admin/dashboard/post-management",
//   },
//   { item: "My Content", link: "/dashboard/my-content" },
//   { item: "Bookmark", link: "/dashboard/bookmark" },
//   { item: "Edit My Profile", link: "/dashboard/edit-profile" },
//   //   {
//   //     item: "Change Password",
//   //     link: "/dashboard/change-password",
//   //   },

//   { item: "Home", link: "/" },
// ];

// const Sidebar = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const user = useGetCurrentUserQuery({});

//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const closeSidebar = () => setIsOpen(false);

//   const SideLinks =
//     user?.data?.data?.role === "ADMIN" ? AdminSidebarLinks : UserSidebarLinks;

//   const pathname = usePathname();

//   return (
//     <div>
//       <Button
//         isIconOnly
//         className="lg:hidden fixed top-4 left-4 "
//         size="lg"
//         variant="flat"
//         onPress={toggleSidebar}
//       >
//         <MdMenuOpen />
//       </Button>
//       {isOpen && (
//         <button
//           className="fixed inset-0 bg-black/50  lg:hidden"
//           onClick={closeSidebar}
//         />
//       )}
//       <aside
//         className={`fixed lg:static top-0 left-0 h-screen md:w-72 bg-background border-r  transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-[100vh]">
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <Button
//                 isIconOnly
//                 className="lg:hidden"
//                 variant="light"
//                 onPress={closeSidebar}
//               ></Button>
//             </div>
//           </div>

//           <nav className="flex-grow overflow-y-auto p-4 space-y-6">
//             {/* {SideLinks.map((item) => (
//               <Link key={item.link} href={item.link} onClick={closeSidebar}>
//                 <Button
//                   className={`w-full justify-start ${
//                     item.link === pathname ? "bg-primary/10 text-primary" : ""
//                   }`}
//                   startContent={<item.icon size={20} />}
//                   variant={item.link === pathname ? "flat" : "light"}
//                 >
//                   {item.item}
//                 </Button>
//               </Link>
//             ))} */}

//             {SideLinks.map((item) => (
//               <Link key={item.link} href={item.link} onClick={closeSidebar}>
//                 <Button
//                   className={`w-full justify-start ${
//                     item.link === pathname ? "bg-primary/10 text-primary" : ""
//                   }`}
//                   variant={item.link === pathname ? "flat" : "light"}
//                 >
//                   {item.item}
//                 </Button>
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;

"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  IoHomeOutline,
  IoLogOutOutline,
  IoKeyOutline,
  IoClose,
} from "react-icons/io5";
import { CiGrid42 } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiEditLine } from "react-icons/ri";
import { LucideMousePointerClick, Menu } from "lucide-react";
import { BsBookmarks } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useAppDispatch } from "@/src/redux/hooks";
import { logout } from "@/src/redux/featureApi/auth/authSlice";
import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { FcHome } from "react-icons/fc";

const userRoutes = [
  { item: "User Profile", link: "/dashboard/profile" },
  { item: "Edit Profile", link: "/dashboard/edit-profile" },
  { item: "My Content", link: "/dashboard/my-content" },
  // { item: "Bookmark", link: "/dashboard/bookmark" },
  {
    item: "Change Password",

    link: "/dashboard/changePassword",
  },
];

const adminRoutes = [
  { item: "User Profile", link: "/dashboard/profile" },
  { item: "Edit Profile", link: "/dashboard/edit-profile" },
  { item: "My Content", link: "/dashboard/my-content" },
  {
    item: "User Management",

    link: "/admin/dashboard/userManagement",
  },
  {
    item: "Posts Management",

    link: "/admin/dashboard/postManagement",
  },
  {
    item: "Payment History",

    link: "/admin/dashboard/paymentHistory",
  },
  // { item: "Bookmark", link: "/dashboard/bookmark" },
  {
    item: "Change Password",

    link: "/dashboard/changePassword",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const { data: currentUserData } = useGetCurrentUserQuery({});

  const links =
    currentUserData?.data?.role === "ADMIN" ? adminRoutes : userRoutes;

  return (
    <>
      <Button
        isIconOnly
        className="lg:hidden fixed top-4 left-4 "
        size="lg"
        variant="flat"
        onPress={toggleSidebar}
      >
        <Menu size={24} />
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
              <Link className="flex items-center space-x-2" href="/">
                <FcHome size={24} />
                <span className="flex items-center text-xl font-semibold">
                  ExploreNest <LucideMousePointerClick />
                </span>
              </Link>
              <Button
                isIconOnly
                className="lg:hidden"
                variant="light"
                onPress={closeSidebar}
              >
                <IoClose size={24} />
              </Button>
            </div>
          </div>

          <nav className="flex-grow overflow-y-auto p-4 space-y-6">
            {/* {links.map((item) => (
              <Link key={item.link} href={item.link} onClick={closeSidebar}>
                <Button
                  className={`w-full justify-start ${
                    item.link === pathname ? " " : ""
                  }`}
                  startContent={<item.icon size={20} />}
                  variant={item.link === pathname ? "flat" : "light"}
                >
                  {item.item}
                </Button>
              </Link>
            ))} */}

            {links.map((item) => (
              <Link key={item.link} href={item.link} onClick={closeSidebar}>
                <Button
                  className={`w-full justify-start ${
                    item.link === pathname ? " " : ""
                  }`}
                  variant={item.link === pathname ? "flat" : "light"}
                >
                  {item.item}
                </Button>
              </Link>
            ))}

            <Button
              className="w-full justify-start text-danger"
              color="danger"
              startContent={<IoLogOutOutline size={20} />}
              variant="flat"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </nav>

          <div className="mt-auto p-4 space-y-4">
            <Divider />
            {/* <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeSwitch />
            </div> */}
            {/* <Button
              className="w-full justify-start text-danger"
              color="danger"
              startContent={<IoLogOutOutline size={20} />}
              variant="flat"
              onClick={handleLogout}
            >
              Logout
            </Button> */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
