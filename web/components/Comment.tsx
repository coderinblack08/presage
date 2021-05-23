import { Menu } from "@headlessui/react";
import React from "react";
import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";
import { mutate } from "swr";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";
import { Avatar } from "./avatar/Avatar";
import { Dropdown, DropdownItem } from "./Dropdown";

export const Comment: React.FC<
  definitions["comments"] & { profiles: definitions["profiles"] }
> = ({ body, id, soundbite_id, profiles }) => {
  return (
    <div className="flex space-x-5 w-full">
      <Avatar displayName={profiles.username} />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold">
            {profiles.displayName}{" "}
            <span className="text-gray ml-1">@{profiles.username}</span>
          </a>
          <Dropdown
            menuButton={
              <Menu.Button className="icon-button">
                <MdMoreHoriz className="w-6 h-6 text-light-gray" />
              </Menu.Button>
            }
          >
            <DropdownItem
              icon={<MdDelete className="w-5 h-5" />}
              onClick={async () => {
                await supabase
                  .from("comments")
                  .delete()
                  .match({ id: id.toString() });
                mutate(
                  ["comments", soundbite_id],
                  (old: definitions["comments"][]) =>
                    old.filter((x) => x.id !== id),
                  false
                );
              }}
            >
              Delete
            </DropdownItem>
            <DropdownItem icon={<MdEdit className="w-5 h-5" />}>
              Edit
            </DropdownItem>
          </Dropdown>
        </div>
        <p className="text-light-gray mt-1">{body}</p>
      </div>
    </div>
  );
};
