import { Disclosure, Transition } from "@headlessui/react";
import {
  IconDotsVertical,
  IconFile,
  IconFolder,
  IconPencil,
  IconPlus,
  IconSwitch2,
  IconTrash,
} from "@tabler/icons";
import { atom, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Button, Menu, MenuDivider, MenuItem, ThemeIcon } from "ui";
import { InferQueryOutput, trpc } from "../../lib/trpc";

interface FileTreeProps {}

const FolderDisclosure: React.FC<{
  folder: InferQueryOutput<"drafts.recursive">["children"][0];
}> = ({ folder }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full block" as="div">
            <FolderOrFileButton openState={open} folder={folder} />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {(folder.children || folder.drafts.length > 0) && (
              <Disclosure.Panel className="border-l-2 py-1 border-[#EEE] ml-3 text-sm text-gray-500">
                {folder.children?.map((child) => (
                  <div className="ml-2" key={child.id}>
                    <FolderDisclosure folder={child} />
                  </div>
                ))}
                {folder.drafts?.map((draft) => (
                  <div className="ml-2" key={draft.id}>
                    <FolderOrFileButton draft={draft} />
                  </div>
                ))}
              </Disclosure.Panel>
            )}
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({}) => {
  const { data: folderTree } = trpc.useQuery(["drafts.recursive"]);

  return (
    <div className="w-full space-y-1">
      {folderTree?.children?.map((folder) => (
        <FolderDisclosure folder={folder} key={folder.id} />
      ))}
      {folderTree?.drafts?.map((draft) => (
        <FolderOrFileButton draft={draft} key={draft.id} />
      ))}
    </div>
  );
};

export const focusedAtom = atom<string | null>(null);
export const FolderOrFileButton: React.FC<{
  openState?: boolean;
  folder?: InferQueryOutput<"folders.byId">;
  draft?: InferQueryOutput<"drafts.byId">;
}> = ({ openState, folder, draft }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [focusedId, setFocusedId] = useAtom(focusedAtom);
  const [name, setName] = useState<string>(
    folder ? folder.name! : draft ? draft.title! : ""
  );
  const deleteDraft = trpc.useMutation(["drafts.delete"]);
  const deleteFolder = trpc.useMutation(["folders.delete"]);
  const updateFolder = trpc.useMutation(["folders.update"]);
  const updateDraft = trpc.useMutation(["drafts.update"]);
  const addDraft = trpc.useMutation(["drafts.add"]);
  const utils = trpc.useContext();

  useEffect(() => {
    if (focusedId === folder?.id || focusedId === draft?.id) {
      setEditing(true);
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
    setFocusedId(null);
  }, [draft?.id, focusedId, folder?.id, setFocusedId]);

  function submit() {
    if (folder) {
      updateFolder.mutate(
        { id: folder.id, name },
        {
          onSuccess: () => {
            utils.refetchQueries(["drafts.recursive"]);
          },
        }
      );
    }
    if (draft) {
      updateDraft.mutate(
        { id: draft.id, title: name },
        {
          onSuccess: () => {
            utils.refetchQueries(["drafts.recursive"]);
          },
        }
      );
    }
  }

  return (
    <Button
      className={`group w-full !justify-start px-2 ${
        openState ? "bg-[#EEE]" : ""
      }`}
      icon={
        <ThemeIcon className="mr-1">
          {folder ? <IconFolder size={21} /> : <IconFile size={21} />}
        </ThemeIcon>
      }
      disableRipple={editing}
      variant="ghost"
      as="div"
    >
      {!editing && <span className="w-full">{name}</span>}
      <input
        ref={ref}
        type="text"
        value={name}
        onBlur={() => {
          setEditing(false);
          submit();
        }}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditing(false);
            ref.current?.blur();
            submit();
          }
        }}
        className={`relative z-[100] bg-transparent focus:outline-none py-1 border-b-2 border-gray-300 w-full ${
          editing ? "block" : "hidden"
        }`}
      />
      {folder && (
        <button
          onClick={(e) => {
            addDraft.mutate({ title: "Untitled", folderId: folder.id });
            e.stopPropagation();
            e.preventDefault();
          }}
          className="group-hover:flex hidden items-center justify-center p-1.5 rounded-md text-gray-400"
        >
          <IconPlus size={16} />
        </button>
      )}
      {folder ? (
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
            onClick={() => {
              if (folder) {
                deleteFolder.mutate(
                  { id: folder?.id },
                  {
                    onSuccess: () => {
                      utils.refetchQueries(["drafts.recursive"]);
                    },
                  }
                );
              }
            }}
            icon={<IconTrash size={20} />}
          >
            Delete
          </MenuItem>
        </Menu>
      ) : (
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
          <MenuDivider />
          <MenuItem
            onClick={() => {
              if (draft) {
                deleteDraft.mutate(
                  { id: draft?.id },
                  {
                    onSuccess: () => {
                      utils.refetchQueries(["drafts.recursive"]);
                    },
                  }
                );
              }
            }}
            icon={<IconTrash size={20} />}
          >
            Delete
          </MenuItem>
        </Menu>
      )}
    </Button>
  );
};
