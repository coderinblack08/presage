import {
  ComboboxOnSelectItem,
  comboboxStore,
  ELEMENT_CODE_BLOCK,
  ELEMENT_MENTION_INPUT,
  ELEMENT_OL,
  ELEMENT_UL,
  toggleCodeBlock,
  toggleList,
  toggleNodeType,
} from "@udecode/plate";
import { Data, NoData } from "@udecode/plate-combobox";
import { getPluginOptions, usePlateEditorRef } from "@udecode/plate-core";
import { MentionPlugin } from "@udecode/plate-mention";
import { Combobox, ComboboxProps } from "@udecode/plate-ui-combobox";
import { Editor, Transforms } from "slate";
import { CommandItemProps } from "../commands";

export interface SlashComboboxProps<TData extends Data = NoData>
  extends Partial<ComboboxProps<TData>> {
  pluginKey: string;
}

export const SlashCombobox = <TData extends Data = NoData>({
  pluginKey,
  id = pluginKey,
  ...props
}: SlashComboboxProps<TData>) => {
  const editor = usePlateEditorRef()!;

  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

  const handleSelectCommand: ComboboxOnSelectItem<TData> = (
    editor,
    item
  ): void => {
    const targetRange = comboboxStore.get.targetRange();

    if (!targetRange) return;

    Transforms.removeNodes(editor as Editor, {
      // TODO: replace any
      match: (node: any) => node.type === ELEMENT_MENTION_INPUT,
    });

    const { type } = item.data as CommandItemProps;

    if ([ELEMENT_UL, ELEMENT_OL].includes(type)) {
      toggleList(editor, { type });
    } else {
      toggleNodeType(editor, { activeType: type });
    }
  };

  return (
    <Combobox
      id={id}
      trigger={trigger!}
      onSelectItem={handleSelectCommand}
      onRenderItem={({ item, search }) => (
        <div className="flex items-center space-x-2">
          {(item.data as any).icon}
          <span>{item.text}</span>
        </div>
      )}
      controlled
      {...props}
    />
  );
};
