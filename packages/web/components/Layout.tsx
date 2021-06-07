import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="px-6 py-8 max-w-7xl mx-auto">{children}</div>
    </div>
  );
};
