import React from "react";

import UserTable from "../../../../components/modules/dashboard/adminDashboard/userManagement/UsersTable";

import { getAllUser } from "@/src/actions/user/user.action";

const UserManagementPage = async () => {
  const users = await getAllUser();

  return (
    <div>
      <UserTable users={users} />
    </div>
  );
};

export default UserManagementPage;
