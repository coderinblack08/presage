import { IconCode, IconH1, IconList, IconListNumbers } from "@tabler/icons";
import {
  Combobox,
  ComboboxOnSelectItem,
  comboboxStore,
  ELEMENT_H1,
  ELEMENT_MENTION_INPUT,
  toggleNodeType,
} from "@udecode/plate";
import { Data, NoData } from "@udecode/plate-combobox";
import { usePlateEditorRef } from "@udecode/plate-core";
import { ComboboxProps } from "@udecode/plate-ui-combobox";
import { Editor, Transforms } from "slate";

export interface MentionComboboxProps<TData extends Data = NoData>
  extends Partial<ComboboxProps<TData>> {
  pluginKey?: string;
}

export const SlashMenuCombobox = <TData extends Data = NoData>({
  pluginKey = "SLASH_MENU",
  id = pluginKey,
  ...props
}: MentionComboboxProps<TData>) => {
  const editor = usePlateEditorRef()!;

  const handleSelectCommand: ComboboxOnSelectItem<TData> = (
    editor,
    item
  ): void => {
    const targetRange = comboboxStore.get.targetRange();

    if (!targetRange) return;

    Transforms.removeNodes(editor as Editor, {
      match: (node: any) => node.type === ELEMENT_MENTION_INPUT,
    });

    switch (item.key) {
      case "h1":
        toggleNodeType(editor, { activeType: ELEMENT_H1 });
      default:
        break;
    }
  };

  return (
    <Combobox
      onSelectItem={handleSelectCommand}
      id={id}
      trigger="/"
      controlled
      {...props}
    />
  );
};

export const TEXT_EDITOR_COMMANDS = [
  {
    key: "ul",
    text: "Bulleted list",
    icon: IconList,
  },
  {
    key: "ol",
    text: "Numbered list",
    icon: IconListNumbers,
  },
  {
    key: "pre",
    text: "Code block",
    icon: IconCode,
  },
  {
    key: "h1",
    text: "Heading",
    icon: IconH1,
  },
];
