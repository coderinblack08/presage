import { IconSelector } from "@tabler/icons";
import React from "react";
import { HiLockClosed, HiUserCircle } from "react-icons/hi";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from "../../../components/dropdown";
import { logout } from "../../authentication/logout";
import { useUser } from "../../authentication/useUser";

interface AccountDropdownProps {}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({}) => {
  const { user } = useUser();

  return (
    <Dropdown
      alignOffset={8}
      align="end"
      trigger={
        <DropdownTrigger>
          <button className="cursor-pointer flex items-center justify-between px-3 py-5 border-t text-left w-full">
            <div className="flex space-x-4 items-center">
              <img
                className={`w-12 h-12 rounded-xl ${
                  !user?.profilePicture ? "border shadow-sm" : ""
                }`}
                src={user?.profilePicture || "/static/default-picture.svg"}
                alt={user?.displayName}
              />
              <div>
                <h6 className="font-bold">{user?.displayName}</h6>
                <p className="text-gray-500 text-sm">Free Plan</p>
              </div>
            </div>
            <IconSelector className="w-6 h-6 text-gray-500" />
          </button>
        </DropdownTrigger>
      }
    >
      <div className="px-4 py-2">
        <h6 className="font-bold">{user?.displayName}</h6>
        <p className="text-gray-500 text-sm truncate">@{user?.username}</p>
      </div>
      <DropdownDivider />
      <DropdownItem icon={<HiUserCircle className="w-5 h-5 text-gray-500" />}>
        Account
      </DropdownItem>
      <DropdownItem
        onClick={logout}
        icon={<HiLockClosed className="w-5 h-5 text-gray-500" />}
      >
        Sign Out
      </DropdownItem>
    </Dropdown>
  );
};
