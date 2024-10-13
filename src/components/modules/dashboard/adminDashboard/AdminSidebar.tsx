import { Home, User, TableOfContentsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa6";

import { Sidebar } from "../shared/sidebar.styles";
import { SidebarItem } from "../shared/Sidebar-item";
import { SidebarMenu } from "../shared/Sidebar-menu";

import { useSidebarContext } from "@/src/app/(dashboardLayout)/layout/layout-context";

export const AdminSidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex items-center" href="/">
            <FaPaperPlane />
            <p className="font-bold text-inherit px-4">Travelio</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              href="/admin-dashboard"
              icon={<Home />}
              isActive={pathname === "/admin-dashboard"}
              title="Home"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                href="/admin-dashboard/users-management"
                icon={<User />}
                isActive={pathname === "/admin-dashboard/users-management"}
                title="users manage"
              />
              <SidebarItem
                href="/admin-dashboard/content-management"
                icon={<TableOfContentsIcon />}
                isActive={pathname === "/admin-dashboard/content-management"}
                title="Content Manage"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};