import { Disclosure, Transition } from "@headlessui/react";
import { useHydrateAtoms } from "jotai/utils";
import {
  IconDotsVertical,
  IconFile,
  IconFilePlus,
  IconFolder,
  IconFolderPlus,
  IconPencil,
  IconPlus,
  IconSwitch2,
  IconTrash,
} from "@tabler/icons";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Button, Menu, MenuDivider, MenuItem, ThemeIcon } from "ui";
import { focusedAtom } from "../../lib/store";
import { InferQueryOutput, trpc } from "../../lib/trpc";

interface FileTreeProps {}

const FolderDisclosure: React.FC<{
  folder: InferQueryOutput<"drafts.recursive">["children"][0];
}> = ({ folder }) => {
  const containsChildren = !!(folder.children || folder.drafts.length > 0);
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full block" as="div">
            <FolderOrFileButton
              openState={open && containsChildren}
              folder={folder}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {containsChildren && (
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

export const FolderOrFileButton: React.FC<{
  openState?: boolean;
  folder?: InferQueryOutput<"drafts.recursive">["children"][0];
  draft?: InferQueryOutput<"drafts.byId">;
}> = ({ openState, folder, draft }) => {
  useHydrateAtoms([[focusedAtom, null]] as const);
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
      setFocusedId(null);
    }
  }, [draft?.id, focusedId, folder?.id, setFocusedId]);

  function submit() {
    if (folder) {
      updateFolder.mutate(
        { id: folder.id, name },
        {
          onSuccess: () => {
            utils.setQueryData(["drafts.recursive"], ((
              old: InferQueryOutput<"drafts.recursive">
            ) => {
              if (old) {
                const dfs = (node: any) => {
                  for (const child of node.children || []) {
                    if (child.id === folder.id) {
                      child.name = name;
                      return;
                    }
                    dfs(child);
                  }
                };
                dfs(old);
                return old;
              }
            }) as any);
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

      {folder ? (
        <>
          <Menu
            trigger={
              <button className="flex items-center justify-center p-1.5 rounded-md text-gray-400">
                <IconPlus size={16} />
              </button>
            }
            className="w-48"
            sideOffset={4}
            onCloseAutoFocus
          >
            <MenuItem
              icon={<IconFilePlus size={20} />}
              onClick={(e) => {
                addDraft.mutate(
                  { title: "Untitled", folderId: folder.id },
                  {
                    onSuccess: (data) => {
                      utils.refetchQueries(["drafts.recursive"]);
                      setFocusedId(data.id);
                    },
                  }
                );
              }}
            >
              New Draft
            </MenuItem>
            <MenuItem icon={<IconFolderPlus size={20} />}>New Folder</MenuItem>
          </Menu>
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
                        utils.setQueryData(["drafts.recursive"], ((
                          old: InferQueryOutput<"drafts.recursive">
                        ) => {
                          if (old) {
                            const dfs = (node: any) => {
                              node.children = node.children || [];
                              for (let i = 0; i < node.children.length; i++) {
                                if (node.children[i].id === folder.id) {
                                  delete node.children[i];
                                  return;
                                }
                                dfs(node.children[i]);
                              }
                            };
                            dfs(old);
                            return old;
                          }
                        }) as any);
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
        </>
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
