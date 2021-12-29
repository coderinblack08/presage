import {
  IconFile,
  IconFilePlus,
  IconFolderPlus,
  IconHeadphones,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Menu, MenuItem } from "../../components/Menu";
import { defaultMutationFn } from "../../lib/defaultMutationFn";
import { Article } from "../../lib/types";

interface SidebarDraftListProps {}

export const SidebarDraftList: React.FC<SidebarDraftListProps> = ({}) => {
  const { data: drafts } = useQuery<Article[]>("/articles/drafts");
  const { mutateAsync } = useMutation(defaultMutationFn);
  const cache = useQueryClient();
  const {
    push,
    pathname,
    query: { id },
  } = useRouter();

  const onPath = (draftId: string) =>
    pathname === "/draft/[id]" && id?.toString() === draftId;

  return (
    <div>
      <Toaster toastOptions={{ position: "bottom-right" }} />
      <div className="space-y-1">
        {drafts?.map((draft) => (
          <Link href={`/draft/${draft.id}`} key={draft.id} passHref>
            <a
              className={`w-full flex items-center space-x-3 px-3.5 py-1.5 rounded-xl group ${
                onPath(draft.id) ? "bg-[#EEEEEE]" : ""
              }`}
            >
              <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
                <IconFile className="w-[19px] h-[19px] text-gray-400" />
              </div>
              <p
                className={`truncate text-[13px] ${
                  onPath(draft.id)
                    ? "text-gray-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {draft?.title}
              </p>
            </a>
          </Link>
        ))}
      </div>
      <Menu
        sideOffset={4}
        className="origin-top w-[250px]"
        trigger={
          <button className="flex items-center space-x-3 px-4 py-2 rounded-xl w-full">
            <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
              <IconFilePlus className="w-[19px] h-[19px] text-gray-400" />
            </div>
            <p className="text-gray-500 truncate text-[13px]">New Entry</p>
          </button>
        }
      >
        <MenuItem
          icon={<IconFilePlus className="w-5 h-5 text-gray-400" />}
          className="text-[13px]"
          onClick={async () => {
            await mutateAsync(["/articles", {}, "POST"], {
              onSuccess: (data) => {
                cache.setQueryData<Article[]>("/articles/drafts", (old) => {
                  return [...(old || []), data];
                });
                toast.success("New draft created!");
                push("/draft/[id]", `/draft/${data.id}`);
              },
              onError: () => {
                toast.error("Failed to create new draft!");
              },
            });
          }}
        >
          New Draft
        </MenuItem>
        <MenuItem
          icon={<IconHeadphones className="w-5 h-5 text-gray-400" />}
          className="text-[13px]"
        >
          New Podcast
        </MenuItem>
        <MenuItem
          icon={<IconFolderPlus className="w-5 h-5 text-gray-400" />}
          className="text-[13px]"
        >
          New Publication
        </MenuItem>
      </Menu>
    </div>
  );
};
