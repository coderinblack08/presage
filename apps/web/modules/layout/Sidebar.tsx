import { IconPlus } from "@tabler/icons";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdHome, MdSavings, MdSubscriptions } from "react-icons/md";
import { Button } from "ui";
import { collapseAtom } from "../../lib/store";
import { InferQueryOutput, trpc } from "../../lib/trpc";
import { FileTree } from "./FileTree";

import { UserDropdown } from "./UserDropdown";

interface SidebarProps {
  width: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ width }) => {
  const [collapsed, setCollapsed] = useAtom(collapseAtom);
  const addFolder = trpc.useMutation(["folders.add"]);
  const addDraft = trpc.useMutation(["drafts.add"]);
  const router = useRouter();
  const utils = trpc.useContext();

  return (
    <motion.div
      initial={{ width, opacity: 1 }}
      animate={{
        width: collapsed ? 0 : width,
        opacity: collapsed ? 0 : 1,
      }}
      transition={{ ease: "linear", duration: 0.2 }}
      className={`sticky top-0 flex flex-col justify-between h-screen flex-shrink-0 select-none`}
    >
      <div className="h-full overflow-y-auto p-2">
        <div className="space-y-1.5 mt-12">
          <Link href="/dashboard" passHref>
            <Button
              as="a"
              variant="ghost"
              icon={<MdHome className="text-gray-300" size={20} />}
              className="w-full !justify-start !p-2 text-[13px]"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/rewards" passHref>
            <Button
              as="a"
              variant="ghost"
              icon={<MdSavings className="text-gray-300" size={20} />}
              className="w-full !justify-start !p-2 text-[13px]"
            >
              Rewards
            </Button>
          </Link>
          <Link href="/settings" passHref>
            <Button
              as="a"
              variant="ghost"
              icon={<MdSubscriptions className="text-gray-300" size={20} />}
              className="w-full !justify-start !p-2 text-[13px]"
            >
              Monetization
            </Button>
          </Link>
        </div>
        <hr className="my-2" />
        <ul className="w-full">
          <FileTree />
          <li>
            <Button
              className="w-full !justify-start px-2 truncate text-[13px]"
              icon={
                <div className="mr-1 text-gray-300">
                  <IconPlus size={21} />
                </div>
              }
              variant="ghost"
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
                      router.push(`/editor/${data.id}`);
                    },
                  }
                );
              }}
            >
              New Draft
            </Button>
          </li>
          <li>
            <Button
              className="w-full !justify-start px-2 truncate text-[13px]"
              icon={
                <div className="mr-1 text-gray-300">
                  <IconPlus size={21} />
                </div>
              }
              variant="ghost"
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
                    },
                  }
                );
              }}
            >
              New Folder
            </Button>
          </li>
        </ul>
      </div>
      <UserDropdown />
    </motion.div>
  );
};
