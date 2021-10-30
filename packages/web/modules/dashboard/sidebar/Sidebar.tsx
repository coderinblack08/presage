import { IconSearch } from "@tabler/icons";
import React from "react";
import { Logo } from "../../../components/branding/Logo";
import { Input } from "../../../components/input";
import { AccountDropdown } from "./AccountDropdown";
import { JournalList } from "./JournalList";
import { MenuLinks } from "./MenuLinks";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <nav className="flex flex-col justify-between bg-[#FAFAF9] max-w-xs h-screen overflow-y-scroll w-full border-r">
      <div>
        <div className="px-3 pt-6">
          <Logo />
          <div className="mt-4">
            <Input
              shortcut="⌘K"
              placeholder="Jump To..."
              icon={<IconSearch className="text-gray-400 w-5 h-5" />}
              outline
            />
          </div>
          <div className="my-4">
            <MenuLinks />
          </div>
        </div>
        <hr />
        <JournalList />
      </div>
      <AccountDropdown />
    </nav>
  );
};
