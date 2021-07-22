import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { Logout, TicketStar, User as UserIcon } from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { mutator } from "../lib/mutator";
import { User } from "../lib/types";
import { Avatar } from "./Avatar";
import { Dropdown, MenuItem } from "./Dropdown";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();
  const { mutateAsync } = useMutation(mutator);
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
            onClick={() => router.push("/rewards")}
            icon={
              <div className="scale-80">
                <TicketStar set="bulk" />
              </div>
            }
          >
            Rewards
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await mutateAsync(["/logout", {}, "post"], {
                onSuccess: () => {
                  queryClient.clear();
                  router.reload();
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
