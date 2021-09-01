import React from "react";
import { useHasMounted } from "../../../lib/useHasMounted";
import { useSSRMediaQuery } from "../../../lib/useSSRMediaQuery";
import { Sidebar } from "./Sidebar";
import { SidebarPanel } from "./SidebarPanel";

interface ResponsiveSidebarProps {
  mobile?: boolean;
}

export const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({
  mobile = false,
}) => {
  const hideSidebar = useSSRMediaQuery("(max-width: 900px)");
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  if (hideSidebar && mobile) {
    return <SidebarPanel />;
  }

  if (!mobile && !hideSidebar) {
    return <Sidebar />;
  }

  return null;
};
