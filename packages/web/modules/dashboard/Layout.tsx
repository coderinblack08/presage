import React from "react";
import { Sidebar } from "./sidebar/Sidebar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="sticky top-0 h-screen hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};
