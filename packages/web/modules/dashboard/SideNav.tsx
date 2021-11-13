import { IconInput } from "@presage/ui";
import { IconSearch } from "@tabler/icons";
import Image from "next/image";
import React from "react";
import logo from "../../public/static/logo.svg";
import { MenuLinks } from "./MenuLinks";
import { UserDropdown } from "./UserDropdown";

interface SideNavProps {}

export const SideNav: React.FC<SideNavProps> = ({}) => {
  return (
    <nav className="flex flex-col justify-between max-w-xs h-screen w-full border-r border-gray-700/50">
      <div className="px-3 py-8">
        <Image src={logo} alt="Presage Logo" />
        <IconInput
          icon={<IconSearch size={16} className="text-gray-500" />}
          className="mt-2"
          placeholder="Jump To..."
        />
        <div className="mt-4">
          <MenuLinks />
        </div>
      </div>
      <UserDropdown />
    </nav>
  );
};
