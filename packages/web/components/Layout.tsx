import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="p-5 md:p-8 pb-20 max-w-8xl mx-auto">{children}</div>
    </div>
  );
};
