import React from "react";
import { QuickFindPopover } from "./QuickFindPopover";
import { SidebarItem } from "./SidebarItem";
import { UserDropdown } from "./UserDropdown";
import logo from "../../public/static/logo.svg";
import Image from "next/future/image";
import Link from "next/link";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="flex flex-col justify-between relative h-screen w-[280px] flex-shrink-0 border-r bg-zinc-50">
      <div className="h-full overflow-y-auto">
        <div className="px-3 pt-8 space-y-4">
          <Link href="/">
            <a>
              <Image
                src={logo}
                alt="Presage Logo"
                width={131 * (10 / 11)}
                height={22 * (10 / 11)}
              />
            </a>
          </Link>
          <QuickFindPopover />
        </div>
        <div className="overflow-auto">
          <div className="px-3 py-4 space-y-2.5">
            <SidebarItem name="learn" />
            <SidebarItem name="explore" />
            <SidebarItem name="subscriptions" />
            <SidebarItem name="rewards" />
          </div>
        </div>
      </div>
      <UserDropdown />
    </div>
  );
};
