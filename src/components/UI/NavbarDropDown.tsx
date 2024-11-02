"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

import { MdOutlineLogout } from "react-icons/md";
import { LogoutIcon } from "../icons";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { toast } from "sonner";

const NavbarDropDown = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleNavigate = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    toast.success("Logout Successfully");
  };

  // const currentUser = useAppSelector((state) => state.auth.user);
  const currentUser = useAppSelector(useCurrentUser);
  console.log(currentUser);

  // const { name, email, role, phone, address, img } = currentUser;

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Avatar
          src={currentUser?.img}
          isBordered
          radius="sm"
          className="cursor-pointer"
        ></Avatar>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigate("/dashboard")}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigate("/profile")}>
          profile
        </DropdownItem>

        <DropdownItem
          onClick={handleLogout}
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
