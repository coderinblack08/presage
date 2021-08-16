import React from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-auto">{children}</div>
    </div>
  );
};
