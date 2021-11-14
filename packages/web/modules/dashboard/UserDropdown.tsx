import { Avatar, Menu, MenuDivider, MenuItem } from "@presage/ui";
import {
  IconCreditCard,
  IconLogout,
  IconSelector,
  IconUser,
} from "@tabler/icons";
import React from "react";
import { useQuery } from "react-query";
import { User } from "../../lib/types";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const { data: me } = useQuery<User>("/auth/me");

  return (
    <Menu
      className="w-[18rem]"
      sideOffset={0}
      trigger={
        <button className="p-5 focus:outline-none flex items-center justify-between text-left w-full">
          <div className="flex items-center space-x-4">
            <Avatar
              size="lg"
              src={me?.profilePicture!}
              name={me?.displayName!}
            />
            <div>
              <h6 className="font-bold mb-0.5">{me?.displayName}</h6>
              <p className="text-gray-500 text-sm">Free Plan</p>
            </div>
          </div>
          <IconSelector className="text-gray-400" size={24} />
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
