import React from "react";
import { MdSearch } from "react-icons/md";
import { Logo } from "../../components/branding/Logo";
import { Input } from "../../components/input";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <nav className="relative h-screen w-64">
      <div className="px-6 py-8">
        <Logo />
        <Input icon={<MdSearch className="w-6 h-6" />} placeholder="Jump to" />
      </div>
    </nav>
  );
};
