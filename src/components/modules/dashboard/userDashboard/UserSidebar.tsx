import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { useSidebarContext } from "@/app/(dashboardLayout)/layout/layout-context";
import { FaPaperPlane } from "react-icons/fa6";

import { Sidebar } from "../shared/sidebar.styles";
import { SidebarItem } from "../shared/Sidebar-item";
import { useSidebarContext } from "@/src/app/(dashboardLayout)/layout/layout-context";
// import { useSidebarContext } from "@/src/app/(dashboardLayout)/(userDashboard)/dashboard/layout/layout-context";

//  import { useSidebarContext } from "@/src/app/(dashboardLayout)/layout/layout-context";

export const SidebarWrapper = () => {
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
              href="/dashboard"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              title="Home"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};