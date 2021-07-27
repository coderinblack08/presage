import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { Discovery, Logout, TicketStar, User as UserIcon } from "react-iconly";
import { MdExpandMore } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { mutator } from "../lib/mutator";
import { User } from "../lib/types";
import { Avatar } from "./Avatar";
import { Dropdown, MenuItem } from "./Dropdown";

interface UserDropdownProps {
  fullName?: boolean;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  fullName = false,
}) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();

  return (
    <div>
      {me ? (
        <Dropdown
          className="shadow-lg"
          position={fullName ? "bottom-left" : "bottom-right"}
          opener={
            <Menu.Button className="flex items-center space-x-2 focus:outline-none">
              {fullName ? (
                <button className="flex items-center space-x-4 focus:outline-none">
                  <img
                    src={me?.profilePicture}
                    alt={me?.displayName}
                    className="w-7 h-7 object-cover rounded-full"
                  />
                  <h6 className="font-display font-bold text-lg leading-none">
                    {me?.displayName}
                  </h6>
                </button>
              ) : (
                <Avatar user={me} />
              )}
            </Menu.Button>
          }
        >
          {fullName ? (
            <MenuItem
              onClick={() => router.push("/explore")}
              icon={
                <div className="scale-80">
                  <Discovery set="bulk" />
                </div>
              }
            >
              Explore
            </MenuItem>
          ) : null}
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
            onClick={async () => {
              await mutateAsync(["/logout", {}, "post"], {
                onSuccess: () => {
                  queryClient.clear();
                  router.push("/");
                },
              });
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
