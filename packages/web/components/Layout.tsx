import { useRouter } from "next/router";
import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div>
      <Navbar isDraft={pathname === "/draft/[id]"} />
      <div className="p-5 md:p-8 max-w-8xl mx-auto">{children}</div>
    </div>
  );
};
