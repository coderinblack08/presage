import {
  IconDotsVertical,
  IconFilePlus,
  IconFolder,
  IconFolderPlus,
  IconPencil,
  IconPlus,
  IconSwitch2,
  IconTrash,
} from "@tabler/icons";
import { atom, useAtom } from "jotai";
import Image from "next/future/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Menu, MenuDivider, MenuItem, ThemeIcon } from "ui";
import { InferQueryOutput, trpc } from "../../lib/trpc";
import logo from "../../public/static/logo.svg";
import { QuickFindPopover } from "./QuickFindPopover";
import { SidebarItem } from "./SidebarItem";
import { UserDropdown } from "./UserDropdown";

interface SidebarProps {
  width: number;
}

const focusedAtom = atom<string | null>(null);

const FolderOrFileButton: React.FC<{
  folder?: InferQueryOutput<"folders.byId">;
}> = ({ folder }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [focusedId, setFocusedId] = useAtom(focusedAtom);
  const deleteFolder = trpc.useMutation(["folders.delete"]);
  const utils = trpc.useContext();

  useEffect(() => {
    if (focusedId === folder?.id) {
      setEditing(true);
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
    setFocusedId(null);
  }, [focusedId, folder?.id, setFocusedId]);

  return (
    <Button
      className="w-full !justify-start px-2"
      icon={
        <ThemeIcon className="mr-1">
          <IconFolder size={21} />
        </ThemeIcon>
      }
      disableRipple={editing}
      variant="ghost"
      as="div"
    >
      {!editing && <span className="w-full">{folder?.name}</span>}
      <input
        ref={ref}
        type="text"
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditing(false);
            ref.current?.blur();
          }
        }}
        className={`relative z-[100] bg-transparent focus:outline-none py-1 border-b-2 border-gray-300 w-full ${
          editing ? "block" : "hidden"
        }`}
        value={folder?.name}
      />
      <Menu
        side="right"
        align="start"
        className="w-64"
        onCloseAutoFocus
        sideOffset={26}
        trigger={
          <button className="flex items-center justify-center p-1.5 rounded-md text-gray-400">
            <IconDotsVertical size={16} />
          </button>
        }
      >
        <MenuItem
          onClick={() => {
            setEditing(true);
            setTimeout(() => {
              ref.current?.focus();
            }, 0);
          }}
          icon={<IconPencil size={20} />}
        >
          Rename
        </MenuItem>
        <MenuItem icon={<IconSwitch2 size={20} />}>
          Convert to publication
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() =>
            folder &&
            deleteFolder.mutate(
              { id: folder?.id },
              {
                onSuccess: () => {
                  utils.setQueryData(["folders.all"], (old) =>
                    (old || []).filter((f) => f.id !== folder?.id)
                  );
                },
              }
            )
          }
          icon={<IconTrash size={20} />}
        >
          Delete
        </MenuItem>
      </Menu>
    </Button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ width }) => {
  const addFolder = trpc.useMutation(["folders.add"]);
  const { data: folders } = trpc.useQuery(["folders.all"]);
  const [_, setFocusedId] = useAtom(focusedAtom);
  const utils = trpc.useContext();

  return (
    <div
      className="flex flex-col justify-between relative h-screen flex-shrink-0 bg-zinc-50"
      style={{ width }}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-3 pt-8 space-y-4">
          <Link href="/">
            <a>
              <Image
                src={logo}
                alt="Presage Logo"
                width={131 * (10 / 11)}
                height={22 * (10 / 11)}
              />
            </a>
          </Link>
          <QuickFindPopover />
        </div>
        <div className="overflow-auto">
          <div className="px-3 py-4 space-y-2.5">
            <SidebarItem name="learn" />
            <SidebarItem name="explore" />
            <SidebarItem name="subscriptions" />
            <SidebarItem name="rewards" />
          </div>
        </div>
        <hr />
        <ul className="py-4 w-full px-3">
          {folders?.map((folder) => (
            <li key={folder.id}>
              <FolderOrFileButton folder={folder} />
            </li>
          ))}
          <li>
            <Menu
              onCloseAutoFocus
              align="start"
              sideOffset={4}
              style={{
                width: `calc(${width}px - 1.5rem)`,
              }}
              trigger={
                <Button
                  className="w-full !justify-start px-2"
                  icon={
                    <ThemeIcon className="mr-1">
                      <IconPlus size={21} />
                    </ThemeIcon>
                  }
                  variant="ghost"
                >
                  New File or Folder
                </Button>
              }
            >
              <MenuItem icon={<IconFilePlus size={20} />}>File</MenuItem>
              <MenuItem
                icon={<IconFolderPlus size={20} />}
                onClick={() => {
                  addFolder.mutate(
                    { name: "Untitled" },
                    {
                      onSuccess: (data) => {
                        utils.setQueryData(["folders.all"], (old) => [
                          ...(old || []),
                          data,
                        ]);
                        setFocusedId(data.id);
                      },
                    }
                  );
                }}
              >
                Folder
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </div>
      <UserDropdown />
    </div>
  );
};
