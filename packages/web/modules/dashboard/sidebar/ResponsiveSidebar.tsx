import React from "react";
import { useHasMounted } from "../../../lib/useHasMounted";
import { useSSRMediaQuery } from "../../../lib/useSSRMediaQuery";
import { Sidebar } from "./Sidebar";
import { SidebarPanel } from "./SidebarPanel";

interface ResponsiveSidebarProps {}

export const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({}) => {
  const hideSidebar = useSSRMediaQuery("(max-width: 900px)");
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  if (hideSidebar) {
    return <SidebarPanel />;
  }

  return <Sidebar />;
};
