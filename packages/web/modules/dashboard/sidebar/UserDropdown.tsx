import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownDivider,
  DropdownItem,
} from "../../../components/dropdown";
import { HiLockOpen, HiOutlineSelector, HiUserCircle } from "react-icons/hi";
import { useMeQuery } from "../../../generated/graphql";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const [{ data: user }] = useMeQuery();

  return (
    <Dropdown
      align="end"
      alignOffset={8}
      trigger={
        <DropdownTrigger>
          <button className="cursor-pointer flex items-center justify-between p-5 border-t text-left w-full">
            <div className="flex space-x-5 items-center">
              <img
                className="w-12 h-12 rounded-xl"
                src={user?.me?.profilePicture || ""}
                alt={user?.me?.displayName}
              />
              <div>
                <h6 className="font-bold">{user?.me?.displayName}</h6>
                <p className="text-gray-500 text-sm">Free Plan</p>
              </div>
            </div>
            <HiOutlineSelector className="w-6 h-6 text-gray-500" />
          </button>
        </DropdownTrigger>
      }
    >
      <div className="px-5 py-2">
        <h6 className="font-bold">{user?.me?.displayName}</h6>
        <p className="text-gray-500 text-sm truncate">@{user?.me?.username}</p>
      </div>
      <DropdownDivider />
      <DropdownItem icon={<HiUserCircle className="w-5 h-5" />}>
        Account
      </DropdownItem>
      <DropdownItem icon={<HiLockOpen className="w-5 h-5" />}>
        Sign Out
      </DropdownItem>
    </Dropdown>
  );
};
