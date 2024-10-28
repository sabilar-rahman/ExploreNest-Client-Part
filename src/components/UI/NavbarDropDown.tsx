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

const NavbarDropDown = () => {
  const router = useRouter();

  const handleNavigate = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Avatar isBordered radius="sm" className="cursor-pointer"></Avatar>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigate("/dashboard")}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigate("/profile")}>
          profile
        </DropdownItem>

        <DropdownItem   className="text-danger" color="danger">
          Logout 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
