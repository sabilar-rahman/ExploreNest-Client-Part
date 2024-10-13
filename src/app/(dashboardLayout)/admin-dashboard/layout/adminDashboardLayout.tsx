"use client";

import { AdminSidebarWrapper } from "@/src/components/modules/dashboard/adminDashboard/AdminSidebar";
import { NavbarWrapper } from "@/src/components/modules/dashboard/userDashboard/UserNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex border">
      <AdminSidebarWrapper />
      <NavbarWrapper>
        <div className="px-12 py-12">{children}</div>
      </NavbarWrapper>
    </div>
  );
};

export default AdminLayout;
