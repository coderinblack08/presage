import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { Logout, User as UserIcon } from "react-iconly";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../lib/types";
import { Avatar } from "./Avatar";
import { Dropdown, MenuItem } from "./Dropdown";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <div>
      {me ? (
        <Dropdown
          opener={
            <Menu.Button className="focus:outline-none">
              <Avatar user={me} />
            </Menu.Button>
          }
        >
          <MenuItem
            onClick={() => router.push("/u/[username]", `/u/${me.username}`)}
            icon={
              <div className="scale-80">
                <UserIcon set="bulk" />
              </div>
            }
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("access-token");
              queryClient.clear();
              router.reload();
            }}
            icon={
              <div className="scale-80">
                <Logout set="bulk" />
              </div>
            }
          >
            Logout
          </MenuItem>
        </Dropdown>
      ) : null}
    </div>
  );
};
