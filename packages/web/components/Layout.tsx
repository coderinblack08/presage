import { useRouter } from "next/router";
import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  const { pathname } = useRouter();

  return (
    <div>
      <Navbar isDraft={pathname === "/draft/[id]"} />
      <div className={`px-5 md:px-8 max-w-8xl mx-auto ${className}`}>
        {children}
      </div>
    </div>
  );
};
