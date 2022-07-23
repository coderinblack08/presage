import {
  IconChevronsLeft,
  IconFilePlus,
  IconFolderPlus,
  IconPlus,
} from "@tabler/icons";
import { useAtom } from "jotai";
import Image from "next/future/image";
import Link from "next/link";
import React from "react";
import { Button, Menu, MenuItem, ThemeIcon } from "ui";
import { collapseAtom, focusedAtom } from "../../lib/store";
import { InferQueryOutput, trpc } from "../../lib/trpc";
import logo from "../../public/static/logo.svg";
import { FileTree } from "./FileTree";
import { QuickFindPopover } from "./QuickFindPopover";
import { SidebarItem } from "./SidebarItem";
import { motion } from "framer-motion";

import { UserDropdown } from "./UserDropdown";

interface SidebarProps {
  width: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ width }) => {
  const [collapsed, setCollapsed] = useAtom(collapseAtom);
  const addFolder = trpc.useMutation(["folders.add"]);
  const addDraft = trpc.useMutation(["drafts.add"]);
  const [focusedId, setFocusedId] = useAtom(focusedAtom);
  const utils = trpc.useContext();

  return (
    <motion.div
      initial={{ width, opacity: 1 }}
      animate={{
        width: collapsed ? 0 : width,
        opacity: collapsed ? 0 : 1,
      }}
      transition={{ ease: "linear", duration: 0.2 }}
      className={`sticky top-0 flex flex-col justify-between h-screen flex-shrink-0 bg-zinc-50 select-none`}
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
          <div className="p-3 space-y-1.5">
            <SidebarItem name="dashboard" />
            <SidebarItem name="explore" />
            <SidebarItem name="subscriptions" />
            <SidebarItem name="rewards" />
          </div>
        </div>
        <hr />
        <ul className="py-4 w-full px-3">
          <FileTree />
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
                  className="w-full !justify-start px-2 truncate"
                  icon={
                    <ThemeIcon className="mr-1">
                      <IconPlus size={21} />
                    </ThemeIcon>
                  }
                  variant="ghost"
                >
                  New Draft / Folder
                </Button>
              }
            >
              <MenuItem
                icon={<IconFilePlus size={20} />}
                onClick={() => {
                  addDraft.mutate(
                    { title: "Untitled" },
                    {
                      onSuccess: (data) => {
                        utils.setQueryData(["drafts.recursive"], ((
                          old: InferQueryOutput<"drafts.recursive">
                        ) => {
                          if (old) {
                            old.drafts.push(data);
                            return old;
                          }
                        }) as any);
                        setFocusedId(data.id);
                      },
                    }
                  );
                }}
              >
                Draft
              </MenuItem>
              <MenuItem
                icon={<IconFolderPlus size={20} />}
                onClick={() => {
                  addFolder.mutate(
                    { name: "Untitled" },
                    {
                      onSuccess: (data) => {
                        utils.setQueryData(["drafts.recursive"], ((
                          old: InferQueryOutput<"drafts.recursive">
                        ) => {
                          if (old) {
                            old.children.push({
                              depth: 1,
                              path: [data.id],
                              children: [],
                              drafts: [],
                              ...data,
                            });
                            return old;
                          }
                        }) as any);
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
    </motion.div>
  );
};
