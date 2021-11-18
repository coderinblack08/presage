import { Menu, MenuDivider, MenuItem } from "@presage/ui";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import React from "react";
import { useQuery } from "react-query";
import { Journal } from "../../lib/types";
import { MenuItemLink, MenuItemProps } from "./MenuItem";

export const JournalDropdown: React.FC<MenuItemProps & { trigger: any }> = ({
  link,
  trigger,
}) => {
  const { data: journals } = useQuery<Journal[]>("/journals");

  return (
    <Menu
      trigger={
        <button className="focus:outline-none w-full">
          <MenuItemLink link={link} />
        </button>
      }
      className="w-64"
      align="start"
      sideOffset={8}
      alignOffset={129.5}
    >
      {journals?.map((journal) => (
        <Menu
          subMenu
          key={journal.id}
          alignOffset={-5}
          sideOffset={8}
          trigger={
            <MenuItem
              trigger
              className="py-2"
              icon={
                <span className="text-xl leading-none w-6 h-6 mr-1">
                  {journal.icon}
                </span>
              }
            >
              {journal.name}
            </MenuItem>
          }
        >
          <MenuItem icon={<IconPlus size={20} />}>New Draft</MenuItem>
          <MenuItem icon={<IconPencil size={20} />}>Edit Journal</MenuItem>
          <MenuItem icon={<IconTrash size={20} />}>Delete Journal</MenuItem>
        </Menu>
      ))}
      <MenuDivider />
      {trigger}
    </Menu>
  );
};
