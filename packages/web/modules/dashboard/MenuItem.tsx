import { Menu, MenuDivider, MenuItem as UiMenuItem } from "@presage/ui";
import { IconChevronDown, IconFolderPlus, IconPlus } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import shallow from "zustand/shallow";
import {
  useJournalModalState,
  CreateJournalModal,
} from "../journals/CreateJournalModal";

interface MenuItemProps {
  link: {
    name: string;
    icon: (f: boolean) => JSX.Element;
    href: string;
  };
}

export const MenuItem: React.FC<MenuItemProps> = ({ link }) => {
  const router = useRouter();
  const isFocused = router.pathname === link.href;
  const openModal = useJournalModalState((x) => x.open, shallow);

  const opener = (
    <button
      className={`flex items-center justify-between px-4 py-2 w-full rounded-xl ${
        isFocused ? "bg-purple-500/10" : ""
      }`}
    >
      <div
        className={`flex items-center space-x-2.5 w-full ${
          isFocused ? "text-purple-500" : "text-gray-500"
        }`}
      >
        {link.icon(isFocused)}
        <div className={`capitalize`}>{link.name}</div>
      </div>
      {link.name === "Editor" && (
        <IconChevronDown
          size={20}
          className={isFocused ? "text-purple-500" : "text-gray-400"}
        />
      )}
    </button>
  );

  if (link.name === "Editor") {
    return (
      <>
        <Menu
          trigger={opener}
          className="w-64"
          align="start"
          alignOffset={129.5}
        >
          <Menu
            subMenu
            alignOffset={-5}
            trigger={
              <UiMenuItem
                trigger
                icon={<span className="text-xl leading-none w-6 h-6">🎓</span>}
              >
                School Anecdotes
              </UiMenuItem>
            }
          >
            <UiMenuItem icon={<IconPlus size={20} />}>New Draft</UiMenuItem>
          </Menu>
          <MenuDivider />
          <UiMenuItem
            onClick={(e) => openModal()}
            icon={<IconFolderPlus size={20} />}
          >
            New Journal
          </UiMenuItem>
        </Menu>
        <CreateJournalModal />
      </>
    );
  }

  return (
    <Link href={link.href} passHref>
      {opener}
    </Link>
  );
};
