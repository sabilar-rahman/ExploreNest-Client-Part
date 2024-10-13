"use client"
import { NavbarWrapper } from "@/src/components/modules/dashboard/userDashboard/UserNavbar";
import { SidebarWrapper } from "@/src/components/modules/dashboard/userDashboard/UserSidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SidebarWrapper></SidebarWrapper>
      <NavbarWrapper>
      {children}
      </NavbarWrapper>
    </div>
  );
};

export default UserLayout;
