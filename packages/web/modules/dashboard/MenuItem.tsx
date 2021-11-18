import { IconChevronDown, IconFolderPlus } from "@tabler/icons";
import { MenuItem as UiMenuItem } from "@presage/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useHoistedPopover } from "../../components/HoistedPopover";
import { CreateJournalModal } from "../journals/CreateJournalModal";
import { JournalDropdown } from "./JournalDropdown";

export interface MenuItemProps {
  link: {
    name: string;
    icon: (f: boolean) => JSX.Element;
    href: string;
  };
}

export const MenuItemLink: React.FC<MenuItemProps> = ({ link }) => {
  const router = useRouter();
  const isFocused = router.pathname === link.href;

  return (
    <div
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
    </div>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({ link }) => {
  const [trigger, popover] = useHoistedPopover(
    (setVisible) => (
      <UiMenuItem
        onClick={() => setVisible(true)}
        closeOnSelect={false}
        icon={<IconFolderPlus size={20} />}
      >
        New Journal
      </UiMenuItem>
    ),
    (props) => <CreateJournalModal {...props} />
  );

  if (link.name === "Editor") {
    return (
      <>
        {popover}
        <div className="mb-2">
          <JournalDropdown trigger={trigger} link={link} />
        </div>
      </>
    );
  }

  return (
    <Link href={link.href} passHref>
      <a className="w-full block mb-2">
        <MenuItemLink link={link} />
      </a>
    </Link>
  );
};
