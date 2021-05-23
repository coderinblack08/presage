import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "react-avatar";
import { supabase } from "../lib/supabase";
import { useUser } from "../stores/auth";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Spinner } from "./Spinner";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const router = useRouter();
  const { profile } = useUser();

  return (
    <Dropdown
      marginTop
      menuButton={
        <Menu.Button className="focus:outline-none focus:ring rounded-full">
          {profile ? (
            <Avatar
              name={profile?.username}
              alt={profile?.username}
              className="flex-shrink-0 rounded-full"
              size="36px"
            />
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-darker-gray">
              <Spinner size="4" />
            </div>
          )}
        </Menu.Button>
      }
    >
      <DropdownItem href={`/u/${profile?.username}`}>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Logout
      </DropdownItem>
    </Dropdown>
  );
};
