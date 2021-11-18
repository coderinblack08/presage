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
    <nav className="flex flex-shrink-0 flex-col justify-between max-w-xs h-screen w-full border-r">
      <div className="px-3 py-8">
        <div className="select-none">
          <Image src={logo} alt="Presage Logo" />
        </div>
        <IconInput
          icon={<IconSearch size={18} className="text-gray-400" />}
          className="mt-3"
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
