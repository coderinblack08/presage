import React from "react";
import { HiLockOpen, HiOutlineSelector, HiUserCircle } from "react-icons/hi";
import { Logo } from "../../components/branding/Logo";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from "../../components/dropdown";
import { useMeQuery } from "../../src/generated/graphql";
import { JournalList } from "./JournalList";
import { JournalModal } from "./JournalModal";
import { JumpTo } from "./JumpTo";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [{ data: user }] = useMeQuery();

  return (
    <div className="flex flex-col relative h-screen w-[21.5rem] flex-shrink-0 border-r bg-white">
      <div className="px-4 pt-8">
        <Logo />
        <div className="mt-5">
          <JumpTo />
        </div>
      </div>
      <div className="py-6 space-y-1.5 border-b">
        <SidebarItem name="learn" />
        <SidebarItem name="explore" />
        <SidebarItem name="rewards" />
        <SidebarItem name="settings" />
      </div>
      <div className="h-full px-7">
        <div className="flex items-center justify-between pt-4 pb-3">
          <h4 className="font-bold text-sm">My Journals</h4>
          <JournalModal />
        </div>
        <JournalList />
      </div>
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
          <p className="text-gray-500 text-sm truncate">
            @{user?.me?.username}
          </p>
        </div>
        <DropdownDivider />
        <DropdownItem icon={<HiUserCircle className="w-5 h-5" />}>
          Account
        </DropdownItem>
        <DropdownItem icon={<HiLockOpen className="w-5 h-5" />}>
          Sign Out
        </DropdownItem>
      </Dropdown>
    </div>
  );
};
