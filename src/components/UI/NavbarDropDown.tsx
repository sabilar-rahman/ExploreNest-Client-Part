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
import { toast } from "sonner";
import { GoVerified } from "react-icons/go";
import { Tooltip, Button } from "@nextui-org/react";

// import { useAppDispatch } from "@/src/redux/hook";
//  import { logout } from "@/src/redux/features/auth/authSlice";
// import { useGetCurrentUserQuery } from "@/src/redux/features/auth/authApi";
const NavbarDropdown = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: user } = useGetCurrentUserQuery({});

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  /* 
  To avoid hydration error,
  use State to track if the component has mounted on the client*/
  const [hydration, setHydration] = useState(false);
  useEffect(() => {
    setHydration(true);
  }, []);
  /* If the component hasn't mounted yet,
   return null to avoid rendering mismatched content
  */
  if (!hydration) {
    return null;
  }
  // Render the component content once it has mounted on the client

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    toast.success("Logout Successfully");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  if (!hydration) {
    return null;
  }

  return (
    <Dropdown backdrop="blur">
      <Badge
        isOneChar
        className={`${!user?.data?.isVerified ? "hidden" : ""}`}
        content={
         
            <GoVerified />
       
        }
        placement="top-right"
        shape="circle"
        size="lg"
        color="danger"
      >
        <DropdownTrigger>
          <Avatar
            isBordered
            className="cursor-pointer"
            radius="sm"
            src={user?.data?.profileImage}
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
