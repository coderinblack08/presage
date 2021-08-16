import { AddOutlined } from "@material-ui/icons";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiLockOpen, HiOutlineSelector, HiUserCircle } from "react-icons/hi";
import { Logo } from "../../components/branding/Logo";
import { Button } from "../../components/button";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from "../../components/dropdown";
import { Input } from "../../components/input";
import { useMeQuery } from "../../src/generated/graphql";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [{ data: user }] = useMeQuery();

  return (
    <nav className="flex flex-col relative h-screen w-[21.5rem] flex-shrink-0 border-r">
      <div className="px-5 pt-8">
        <Logo />
        <div className="mt-5">
          <Input
            icon={<FiSearch className="w-5 h-5 text-gray-400" />}
            placeholder="Jump to..."
            shortcut="⌘K"
            outline
          />
        </div>
      </div>
      <div className="pt-6 pb-8 space-y-1.5 border-b">
        <SidebarItem name="learn" />
        <SidebarItem name="explore" />
        <SidebarItem name="rewards" />
        <SidebarItem name="settings" />
      </div>
      <div className="h-full px-9 py-8 space-y-3">
        <h4 className="font-semibold text-sm">My Journals</h4>
        <Button
          icon={<AddOutlined fontSize="small" className="text-gray-500" />}
          color="transparent"
          size="none"
        >
          <span className="text-sm font-semibold text-gray-500">
            New Journal
          </span>
        </Button>
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
          <p className="text-gray-500 text-sm">@{user?.me?.username}</p>
        </div>
        <DropdownDivider />
        <DropdownItem icon={<HiUserCircle className="w-5 h-5" />}>
          Account
        </DropdownItem>
        <DropdownItem icon={<HiLockOpen className="w-5 h-5" />}>
          Sign Out
        </DropdownItem>
      </Dropdown>
    </nav>
  );
};
