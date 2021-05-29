import { Menu } from "@headlessui/react";
import { useMeQuery } from "@presage/gql";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { Avatar } from "./avatar/Avatar";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Spinner } from "./Spinner";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const router = useRouter();
  const { data: user } = useMeQuery();

  return (
    <Dropdown
      marginTop
      menuButton={
        <Menu.Button className="focus:outline-none focus:ring rounded-full">
          {user ? (
            <Avatar
              src={user?.me.profilePicture}
              displayName={user?.me.username}
              className="flex-shrink-0 rounded-full"
              size="sm"
            />
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-darker-gray">
              <Spinner size="4" />
            </div>
          )}
        </Menu.Button>
      }
    >
      <DropdownItem href={`/u/${user?.me.username}`}>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem
        onClick={async () => {
          await firebase.auth().signOut();
          router.reload();
          router.push("/");
        }}
      >
        Logout
      </DropdownItem>
    </Dropdown>
  );
};
