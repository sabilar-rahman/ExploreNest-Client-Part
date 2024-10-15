"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Link,
} from "@nextui-org/react";

import ChangePassword from "../modules/auth/ChangePassword";

import Logout from "./Logout";

const DropDownProfile = ({
  user,
}: {
  user: {
    success: boolean;
    message: string;
    data: {
      name: string;
      img: string;
      email: string;
      role: string;
      password?: string;
    };
  };
}) => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown closeOnSelect={false} placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user?.data?.img,
            }}
            className="transition-transform"
            name={user?.data?.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{user?.data?.email}</p>
          </DropdownItem>
          <DropdownItem key="dashboard">
            {user?.data?.role && user?.data?.role === "admin" ? (
              <Link href="/admin-dashboard">Dashboard</Link>
            ) : (
              <Link href="/dashboard">Dashboard</Link>
            )}
          </DropdownItem>
          <DropdownItem key="Userprofile">
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          {user?.data?.password && user?.data?.password ? (
            <DropdownItem
              key="changePassword"
              onClick={(e) => e.stopPropagation()}
            >
              <ChangePassword user={user} />
            </DropdownItem>
          ) : (
            <DropdownItem key="changePasswordDisabled" />
          )}
          <DropdownItem key="logout">
            <Logout />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDownProfile;
