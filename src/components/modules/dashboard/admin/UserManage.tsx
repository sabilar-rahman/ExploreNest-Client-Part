"use client";
import Loading from "@/src/components/Loading";
import {
  useGetAllUserQuery,
  useStatusToggleMutation,
} from "@/src/redux/featureApi/auth/authApi";
import { useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { TUser } from "@/src/utils";
import {
  Avatar,
  Button,
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { color } from "framer-motion";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "Email", uid: "email" },
  // { name: "GENDER", uid: "gender" },
  { name: "FOLLOWERS", uid: "followers" },
  { name: "FOLLOWING", uid: "following" },
  { name: "STATUS", uid: "status" },
  { name: "ROLE", uid: "role" },
  // { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "success",
  BLOCKED: "danger",
};

const UserManage = () => {
  const router = useRouter();
  const currentUser = useAppSelector(useCurrentUser);

  const { data: allUsers } = useGetAllUserQuery({});

  const [toggleStatus] = useStatusToggleMutation();

  const users = allUsers?.data?.filter(
    (user) => user?._id !== currentUser?._id
  ) as TUser[];

  const handleUpdateStatus = async (id: string) => {
    await toggleStatus(id);
  };
  const renderCell = React.useCallback((user: TUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof TUser];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">



            {/* <Avatar
              className="bg-primary/10 text-primary"
              name={user.name}
              size="sm"
              src={user.profileImage}
            /> */}
            
            <p className="font-medium">{user.name}</p>
          </div>
        );
      case "email":
        return <p className="text-sm text-default-600">{user.email}</p>;
      case "gender":
        return <p className="capitalize text-sm">{user.gender}</p>;
      case "followers":
        return (
          <p className="text-sm text-center font-semibold">
            {user.followers.length}
          </p>
        );
      case "following":
        return (
          <p className="text-sm text-center font-semibold">
            {user.following.length}
          </p>
        );
      case "role":
        return (
          //   <Chip className="capitalize"  size="sm" variant="flat">
          //     {user.role}
          //   </Chip>

          <p className="capitalize text-sm"> {user.role}</p>
        );
      case "status":
        return (
          //   <Chip
          //     className="capitalize cursor-pointer"
          //     color={statusColorMap[user.status]}
          //     size="sm"
          //     variant="dot"
          //     onClick={() => handleUpdateStatus(user._id)}
          //   >
          //     {user.status}
          //   </Chip>
          <Tooltip
            color="danger"
            content={
              user.status === "ACTIVE" ? "Click to Block" : "Click to Activate"
            }
            placement="top"
          >
            <Chip
              className="capitalize cursor-pointer"
              color={statusColorMap[user.status]}
              size="sm"
              variant="dot"
              onClick={() => handleUpdateStatus(user._id)}
            >
              {user.status}
            </Chip>
          </Tooltip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            {/* <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => viewUser(user._id)}
            >
              <EyeIcon className="w-4 h-4" />
            </Button> */}
          </div>
        );
      default:
        if (typeof cellValue === "string" || typeof cellValue === "number") {
          return <p className="text-sm">{cellValue}</p>;
        } else if (Array.isArray(cellValue)) {
          return (
            <p className="text-sm">
              {cellValue.length > 0 ? cellValue.join(", ") : "N/A"}
            </p>
          );
        } else {
          return <p className="text-sm">N/A</p>;
        }
    }
  }, []);

  if (!users) {
    return <Loading />;
  }

  if (users.length === 0) {
    return (
      <div className="text-3xl font-semibold text-center">
        No User History Available
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto pt-16">
      <Table
        aria-label="User table with data from API"
        classNames={{
          base: "min-w-[640px]",
          table: "min-w-full",
          th: "bg-default-100 text-default-800 py-3 px-4",
          td: "py-3 px-4",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item._id} className="hover:bg-default-50">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManage;
