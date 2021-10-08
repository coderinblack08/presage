import { getAuth, signOut } from "@firebase/auth";
import { IconLockOpen, IconSelector, IconUser } from "@tabler/icons";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownDivider,
  DropdownItem,
} from "../../../components/dropdown";
import { useUser } from "../../auth/useUser";

interface AccountDropdownProps {}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({}) => {
  const { user } = useUser();
  const router = useRouter();

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
      <DropdownItem icon={<IconUser className="w-5 h-5" />}>
        Account
      </DropdownItem>
      <DropdownItem
        onClick={async () => {
          await signOut(getAuth());
          await axios.post("/api/logout", {});
          router.push("/");
        }}
        icon={<IconLockOpen className="w-5 h-5" />}
      >
        Sign Out
      </DropdownItem>
    </Dropdown>
  );
};
