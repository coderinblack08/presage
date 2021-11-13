import { Avatar, Menu, MenuDivider, MenuItem } from "@presage/ui";
import { IconCreditCard, IconLogout, IconUser } from "@tabler/icons";
import React from "react";
import { useQuery } from "react-query";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const { data: me } = useQuery("/auth/me");

  return (
    <Menu
      className="w-[18rem]"
      sideOffset={0}
      trigger={
        <button className="p-5 focus:outline-none flex items-center space-x-5 text-left w-full">
          <Avatar
            circle={false}
            size="lg"
            src={me?.profilePicture}
            name={me?.displayName}
          />
          <div>
            <h6 className="font-bold">{me?.displayName}</h6>
            <p className="text-gray-400 text-sm">Free Plan</p>
          </div>
        </button>
      }
    >
      <MenuItem icon={<IconUser size={18} />}>Profile</MenuItem>
      <MenuItem icon={<IconCreditCard size={18} />}>Upgrade</MenuItem>
      <MenuDivider />
      <MenuItem icon={<IconLogout size={18} />}>Logout</MenuItem>
    </Menu>
  );
};
