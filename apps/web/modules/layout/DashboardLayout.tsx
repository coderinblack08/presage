import React from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};
