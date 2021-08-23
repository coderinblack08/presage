import React from "react";
import { Logo } from "../../../components/branding/Logo";
import { JournalList } from "./drafts/JournalList";
import { JumpTo } from "./JumpTo";
import { ShowMoreRoutes } from "./ShowMoreRoutes";
import { SidebarItem } from "./SidebarItem";
import { UserDropdown } from "./UserDropdown";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="flex flex-col justify-between relative h-screen w-[300px] flex-shrink-0 border-r bg-warmGray-50">
      <div className="h-full overflow-y-auto">
        <div className="px-3 pt-8 space-y-5">
          <Logo />
          <JumpTo />
        </div>
        <div className="overflow-auto">
          <div className="px-3 py-4 space-y-2.5">
            <SidebarItem name="learn" />
            <SidebarItem name="explore" />
            <SidebarItem name="subscriptions" />
            <SidebarItem name="rewards" />
            <ShowMoreRoutes />
          </div>
          <hr />
          <JournalList />
        </div>
      </div>
      <UserDropdown />
    </div>
  );
};