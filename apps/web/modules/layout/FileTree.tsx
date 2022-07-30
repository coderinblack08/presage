import {
  IconDotsVertical,
  IconFilePlus,
  IconFolder,
  IconFolderPlus,
  IconFolders,
  IconPencil,
  IconPlus,
  IconSwitch2,
  IconTrash,
} from "@tabler/icons";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { MdFolder, MdStickyNote2 } from "react-icons/md";
import { Button, Menu, MenuDivider, MenuItem, SubMenu } from "ui";
import { currentFileAtom, fileTreeAtom } from "../../lib/store";
import { InferQueryOutput, trpc } from "../../lib/trpc";

interface FileTreeProps {}

const FolderDisclosure: React.FC<{
  folder: InferQueryOutput<"drafts.recursive">["children"][0];
  parentFolderPath?: string;
}> = ({ folder, parentFolderPath = "" }) => {
  const containsChildren = !!(folder.children || folder.drafts.length > 0);
  const [currentDraft, setCurrentDraft] = useAtom(currentFileAtom);
  const inCurrentPath = currentDraft.absolutePath
    .join("/")
    .includes(
      parentFolderPath ? `${parentFolderPath}/${folder.id}` : folder.id
    );
  const currentPath = parentFolderPath
    ? `${parentFolderPath}/${folder.id}`
    : folder.id;

  const router = useRouter();
  useEffect(() => {
    if (router.pathname !== "/editor/[id]")
      setCurrentDraft({ absolutePath: [], stringPath: [], draftId: "" });
  }, [router.pathname, setCurrentDraft]);

  const [fileTree, setFileTree] = useAtom(fileTreeAtom);
  const open = useMemo(() => fileTree.has(folder.id), [fileTree, folder.id]);

  useEffect(() => {
    if (inCurrentPath) setFileTree((prev) => new Set([...prev, folder.id]));
  }, [folder.id, inCurrentPath, setFileTree]);

  return (
    <>
      <FolderOrFileButton
        absolutePath={currentPath}
        onClick={() => {
          if (open) {
            setFileTree(
              (prev) => new Set([...[...prev].filter((id) => id !== folder.id)])
            );
          } else {
            setFileTree((prev) => new Set([...prev, folder.id]));
          }
          if (!containsChildren) {
            toast.error("Folder is empty.", {
              position: "bottom-left",
            });
          }
        }}
        openState={open && containsChildren}
        folder={folder}
      />
      {/* <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={open}
      > */}
      {containsChildren && open && (
        <div className="border-l-2 border-[#EEE] ml-3 py-1 text-sm text-gray-500 space-y-1">
          {folder.children?.map((child) => (
            <div className="ml-2" key={child.id}>
              <FolderDisclosure parentFolderPath={currentPath} folder={child} />
            </div>
          ))}
          {folder.drafts?.map((draft) => (
            <div className="ml-2" key={draft.id}>
              <FolderOrFileButton absolutePath={currentPath} draft={draft} />
            </div>
          ))}
        </div>
      )}
      {/* </Transition> */}
    </>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({}) => {
  const { data: folderTree } = trpc.useQuery(["drafts.recursive"]);
  const [currentFile, setCurrentFile] = useAtom(currentFileAtom);

  useEffect(() => {
    const dfs = (obj: any, path: string[]) => {
      if (obj && "children" in obj && obj.children.length > 0) {
        obj.children.forEach((node: any) => {
          node.drafts?.forEach((draft: any) => {
            if (draft.id === currentFile.draftId) {
              setCurrentFile((prev) => ({
                ...prev,
                absolutePath: [...obj.path, node.id],
                stringPath: [...path, node.name],
              }));
            }
          });
          dfs(node, [...path, node.name]);
        });
      }
    };
    if (folderTree) {
      dfs({ children: [folderTree], path: [] }, []);
    }
  }, [currentFile.draftId, folderTree, setCurrentFile]);

  return (
    <div className="w-full">
      {folderTree?.children?.map((folder) => (
        <FolderDisclosure folder={folder} key={folder.id} />
      ))}
      {folderTree?.drafts?.map((draft) => (
        <FolderOrFileButton absolutePath="" draft={draft} key={draft.id} />
      ))}
    </div>
  );
};

export const FolderOrFileButton: React.FC<{
  openState?: boolean;
  absolutePath: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  folder?: InferQueryOutput<"drafts.recursive">["children"][0];
  draft?: InferQueryOutput<"drafts.byId">;
}> = ({ openState, folder, onClick, draft, absolutePath }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [currentDraft, setCurrentDraft] = useAtom(currentFileAtom);
  const [name, setName] = useState<string>(
    folder ? folder.name! : draft ? draft.title! : ""
  );
  const { data: folders } = trpc.useQuery(["folders.all"]);
  const addFolder = trpc.useMutation(["folders.add"]);
  const deleteDraft = trpc.useMutation(["drafts.delete"]);
  const deleteFolder = trpc.useMutation(["folders.delete"]);
  const updateFolder = trpc.useMutation(["folders.update"]);
  const updateDraft = trpc.useMutation(["drafts.update"]);
  const addDraft = trpc.useMutation(["drafts.add"]);
  const utils = trpc.useContext();

  useEffect(() => {
    if (draft && name !== draft.title) {
      setName(draft.title);
    }
  }, [draft?.title]);

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
          onSuccess: (data) => {
            utils.refetchQueries(["drafts.recursive"]);
            utils.setQueryData(["drafts.byId", { id: draft.id }], data);
          },
        }
      );
    }
  }

  const isOpen = useMemo(
    () =>
      currentDraft.absolutePath.join("/") === absolutePath &&
      currentDraft.draftId === draft?.id,
    [absolutePath, currentDraft.absolutePath, currentDraft.draftId, draft?.id]
  );

  const [fileTree, setFileTree] = useAtom(fileTreeAtom);
  const router = useRouter();

  const button = (
    <Button
      onClick={onClick}
      className={`group w-full !justify-start !p-1.5 text-[13px] ${
        isOpen ? "bg-blue-100/50 hover:bg-blue-100" : ""
      }`}
      rippleColor={draft ? "!bg-blue-900/10" : ""}
      icon={
        <div className={isOpen ? "text-blue-300" : "text-gray-300"}>
          {folder ? <MdFolder size={20} /> : <MdStickyNote2 size={20} />}
        </div>
      }
      disableRipple={editing}
      variant="ghost"
      as={draft ? "a" : "div"}
    >
      {!editing && (
        <span className="w-full truncate">{name || "Untitled"}</span>
      )}
      <input
        ref={ref}
        type="text"
        value={name}
        spellCheck={false}
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
            className="w-48 text-[13px]"
            sideOffset={4}
            onCloseAutoFocus
          >
            <MenuItem
              icon={<IconFilePlus size={16} />}
              onClick={() => {
                addDraft.mutate(
                  { title: "Untitled", folderId: folder.id },
                  {
                    onSuccess: (data) => {
                      utils.refetchQueries(["drafts.recursive"]);
                      utils.setQueryData(["drafts.recursive"], ((
                        old: InferQueryOutput<"drafts.recursive">
                      ) => {
                        if (old) {
                          const dfs = (node: any) => {
                            for (const child of node.children || []) {
                              if (child.id === folder.id) {
                                child.drafts.push(data);
                                return;
                              }
                              dfs(child);
                            }
                          };
                          dfs(old);
                          return old;
                        }
                      }) as any);
                      router.push("/editor/[id]", `/editor/${data.id}`);
                      setFileTree((prev) => new Set([...prev, data.folderId!]));
                    },
                  }
                );
              }}
            >
              New Draft
            </MenuItem>
            <MenuItem
              icon={<IconFolderPlus size={16} />}
              onClick={() => {
                addFolder.mutate(
                  {
                    name: "Untitled",
                    parentId: folder.id,
                  },
                  {
                    onSuccess: (data) => {
                      utils.refetchQueries(["drafts.recursive"]);
                      setFileTree((prev) => new Set([...prev, data.parentId!]));
                    },
                  }
                );
              }}
            >
              New Folder
            </MenuItem>
          </Menu>
          <Menu
            side="right"
            align="start"
            className="w-64 text-[13px]"
            onCloseAutoFocus
            sideOffset={20}
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
              icon={<IconPencil size={16} />}
            >
              Rename
            </MenuItem>
            <MenuItem icon={<IconSwitch2 size={16} />}>
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
                        if (router.pathname === "/editor/[id]") {
                          const openDraft = utils.getQueryData([
                            "drafts.byId",
                            { id: router.query.id?.toString() || "" },
                          ]);
                          if (openDraft?.folderId === folder.id) {
                            router.push("/dashboard");
                          }
                        }
                      },
                    }
                  );
                }
              }}
              icon={<IconTrash size={16} />}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Menu
          side="right"
          align="start"
          className="w-64 text-[13px]"
          onCloseAutoFocus
          sideOffset={20}
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
            icon={<IconPencil size={16} />}
          >
            Rename
          </MenuItem>
          <Menu
            subMenu
            trigger={
              <MenuItem trigger icon={<IconFolders size={16} />}>
                Move to folder
              </MenuItem>
            }
          >
            <MenuItem
              className="text-[13px]"
              icon={<IconFolder size={16} />}
              onClick={() => {
                if (draft) {
                  updateDraft.mutate(
                    { id: draft.id, folderId: null },
                    {
                      onSuccess: () => {
                        utils.refetchQueries(["drafts.recursive"]);
                      },
                    }
                  );
                }
              }}
            >
              None <span className="text-gray-400">(Root)</span>
            </MenuItem>
            <MenuDivider />
            {folders?.map((folder) => (
              <MenuItem
                key={folder.id}
                className="text-[13px]"
                icon={<IconFolder size={16} />}
                onClick={() => {
                  if (draft) {
                    updateDraft.mutate(
                      { id: draft.id, folderId: folder.id },
                      {
                        onSuccess: () => {
                          utils.refetchQueries(["drafts.recursive"]);
                        },
                      }
                    );
                  }
                }}
              >
                {folder.name}
              </MenuItem>
            ))}
          </Menu>
          <MenuItem
            onClick={() => {
              if (draft) {
                deleteDraft.mutate(
                  { id: draft?.id },
                  {
                    onSuccess: () => {
                      utils.setQueryData(["drafts.recursive"], ((
                        old: InferQueryOutput<"drafts.recursive">
                      ) => {
                        if (old) {
                          const dfs = (node: any) => {
                            for (let i = 0; i < node.drafts.length; i++) {
                              if (node.drafts[i].id === draft.id) {
                                delete node.drafts[i];
                                return;
                              }
                            }
                            for (const child of node.children || []) {
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
                if (
                  router.pathname === "/editor/[id]" &&
                  router.query.id === draft.id
                ) {
                  router.push("/dashboard");
                }
              }
            }}
            icon={<IconTrash size={16} />}
          >
            Delete
          </MenuItem>
        </Menu>
      )}
    </Button>
  );

  if (draft) {
    return (
      <Link
        href="/editor/[id]"
        as={`/editor/${encodeURIComponent(draft?.id || "")}`}
        passHref
      >
        {button}
      </Link>
    );
  }

  return button;
};
