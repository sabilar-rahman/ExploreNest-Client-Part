// // "use client";

// // import { Avatar } from "@nextui-org/avatar";
// // import { Button } from "@nextui-org/button";

// // import {
// //   Dropdown,
// //   DropdownItem,
// //   DropdownMenu,
// //   DropdownTrigger,
// // } from "@nextui-org/dropdown";
// // import { useRouter } from "next/navigation";

// // import { MdOutlineLogout } from "react-icons/md";
// // import { LogoutIcon } from "../icons";
// // import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
// // import { logout, useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
// // import { toast } from "sonner";
// // import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
// // import authCurrentUser from "@/src/redux/featureApi/auth/authCurrentUser";
// // import { useEffect, useState } from "react";

// // const NavbarDropDown = () => {
// //   const router = useRouter();

// //   const dispatch = useAppDispatch();

// //   //  const { user } = authCurrentUser();

// //   const {data} = useGetCurrentUserQuery({})

 

// //   const handleNavigate = (pathname: string) => {
// //     router.push(pathname);
// //   };

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     router.push("/");
// //     toast.success("Logout Successfully");
// //   };



// //   return (
// //     <Dropdown backdrop="blur">
// //       <DropdownTrigger>
// //         <Avatar
// //           src={data?.data?.img}
// //           isBordered
// //           radius="sm"
// //           className="cursor-pointer"
// //         ></Avatar>
// //       </DropdownTrigger>
// //       <DropdownMenu aria-label="Static Actions">
// //         <DropdownItem onClick={() => handleNavigate("/dashboard/profile")}>
// //           Dashboard
// //         </DropdownItem>
// //         <DropdownItem onClick={() => handleNavigate("/dashboard/profile")}>
// //          My profile
// //         </DropdownItem>

// //         <DropdownItem
// //           onClick={handleLogout}
// //           className="text-danger"
// //           color="danger"
// //         >
// //           Logout
// //         </DropdownItem>
// //       </DropdownMenu>
// //     </Dropdown>
// //   );
// // };

// // export default NavbarDropDown;


// "use client";

// import { Avatar } from "@nextui-org/avatar";
// import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
// import { useRouter } from "next/navigation";
// import { MdOutlineLogout } from "react-icons/md";
// import { useAppDispatch } from "@/src/redux/hooks";
// import { logout } from "@/src/redux/featureApi/auth/authSlice";
// import { toast } from "sonner";
// import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";

// const NavbarDropDown = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { data } = useGetCurrentUserQuery({});



//   const handleNavigate = (pathname: string) => {
//     router.push(pathname);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/");
//     toast.success("Logout Successfully");
//   };

//   return (
//     <Dropdown backdrop="blur">
//       <DropdownTrigger>
//         <Avatar
//           src={data?.data?.img}
//           isBordered
//           radius="sm"
//           className="cursor-pointer"
//         />
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem onClick={() => handleNavigate("/dashboard/profile")}>
//           Dashboard
//         </DropdownItem>
//         <DropdownItem onClick={() => handleNavigate("/dashboard/profile")}>
//           My profile
//         </DropdownItem>
//         <DropdownItem
//           onClick={handleLogout}
//           className="text-danger"
//           color="danger"
//         >
//           Logout
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default NavbarDropDown;

"use client";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
// import { useAppDispatch } from "@/src/redux/hooks";
import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { logout } from "@/src/redux/featureApi/auth/authSlice";

// import { useAppDispatch } from "@/src/redux/hook";
//  import { logout } from "@/src/redux/features/auth/authSlice";
// import { useGetCurrentUserQuery } from "@/src/redux/features/auth/authApi";
const NavbarDropdown = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: userData } = useGetCurrentUserQuery({});

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    //  todo: handle protected route
    router.push("/");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dropdown>
      <Badge
        isOneChar
        className={`${!userData?.data?.isVerified ? "hidden" : ""}`}
        color="success"
        content={<CheckIcon />}
        placement="bottom-right"
        shape="circle"
      >
        <DropdownTrigger>
          <Avatar
            isBordered
            className="cursor-pointer"
            color="primary"
            src={userData?.data?.profileImage}
          />
        </DropdownTrigger>
      </Badge>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/dashboard/profile")}>
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;


