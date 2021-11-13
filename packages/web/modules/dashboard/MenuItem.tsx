import { Menu, MenuDivider, MenuItem as UiMenuItem } from "@presage/ui";
import { IconFolderPlus, IconSelector } from "@tabler/icons";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { useCreateJournalMutation } from "../journals/useCreateJournalMutation";

interface MenuItemProps {
  link: {
    name: string;
    icon: JSX.Element;
    href: string;
  };
}

export const MenuItem: React.FC<MenuItemProps> = ({ link }) => {
  const router = useRouter();
  const isFocused = router.pathname === link.href;
  const { mutateAsync } = useCreateJournalMutation();

  const opener = (
    <a
      className={`flex items-center justify-between px-4 py-2 w-full rounded-xl ${
        isFocused ? "bg-gray-800" : ""
      }`}
    >
      <div
        className={`flex items-center space-x-3 w-full ${
          isFocused ? "text-gray-100" : "text-gray-500"
        }`}
      >
        {link.icon}
        <span className="capitalize">{link.name}</span>
      </div>
      {link.name === "Editor" && (
        <IconSelector size={20} className="text-gray-500" />
      )}
    </a>
  );

  if (link.name === "Editor") {
    return (
      <Menu trigger={opener} className="w-[18.5rem]">
        <Menu
          subMenu
          alignOffset={-5}
          sideOffset={8}
          trigger={
            <UiMenuItem
              trigger
              icon={
                <div className="w-9 h-9 rounded-lg shadow border border-gray-700/50 bg-white flex items-center justify-center mr-1">
                  <span className="text-xl leading-none">🎓</span>
                </div>
              }
            >
              School Anecdotes
            </UiMenuItem>
          }
        >
          hi
        </Menu>
        <MenuDivider />
        <UiMenuItem
          icon={
            <div className="flex items-center justify-center w-9 h-9 bg-purple-500/10 rounded-lg mr-1">
              <IconFolderPlus className="text-purple-500 w-6 h-6" />
            </div>
          }
        >
          New Journal
        </UiMenuItem>
      </Menu>
    );
  }

  return (
    <Link href={link.href} passHref>
      {opener}
    </Link>
  );
};
