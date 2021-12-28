import { IconLogout, IconSelector, IconUser } from "@tabler/icons";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Menu, MenuDivider, MenuItem } from "../../components/Menu";
import { ProfilePicture } from "../../components/ProfilePicture";
import { User } from "../../lib/types";

interface AccountDropdownProps {}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({}) => {
  const { data: user } = useQuery<User>("/auth/me");
  const queryClient = useQueryClient();

  return (
    <Menu
      alignOffset={8}
      className="origin-bottom w-[280px]"
      trigger={
        <button className="focus:outline-none cursor-pointer flex items-center justify-between p-5 border-t text-left w-full">
          <div className="flex space-x-4 items-center">
            <ProfilePicture
              className="flex-shrink-0 !w-12 !h-12"
              user={user!}
            />
            <div>
              <h6 className="font-bold">{user?.displayName}</h6>
              <p className="text-gray-500 text-sm">Free Plan</p>
            </div>
          </div>
          <IconSelector className="w-6 h-6 text-gray-500" />
        </button>
      }
    >
      <div className="px-4 py-2">
        <h6 className="font-bold">{user?.displayName}</h6>
        <p className="text-gray-500 mt-0.5 text-sm truncate">
          @{user?.username}
        </p>
      </div>
      <MenuDivider />
      <MenuItem icon={<IconUser className="w-5 h-5 text-gray-400" />}>
        Account
      </MenuItem>
      <MenuItem
        onClick={async () => {
          queryClient.clear();
        }}
        icon={<IconLogout className="w-5 h-5 text-gray-400" />}
      >
        Sign Out
      </MenuItem>
    </Menu>
  );
};
