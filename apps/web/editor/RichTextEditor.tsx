import {
  createComboboxPlugin,
  createExitBreakPlugin,
  createMentionPlugin,
  createPlugins,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createTrailingBlockPlugin,
  Plate,
  serializeHtml,
  TEditableProps,
  usePlateEditorState,
} from "@udecode/plate";
import React from "react";
import { COMMANDS } from "./commands";
import { MarkBalloonToolbar } from "./elements/MarkBalloonToolbar";
import { SlashCombobox } from "./elements/SlashCombobox";
import { plateUIWithPlaceholders } from "./plate-ui";
import { basicNodesPlugins } from "./plugins/basicNodesPlugins";
import { exitBreakPlugin } from "./plugins/exitBreakPlugin";
import { resetBlockTypePlugin } from "./plugins/resetBlockTypePlugin";
import { softBreakPlugin } from "./plugins/softBreakPlugin";
import { trailingBlockPlugin } from "./plugins/trailingBlockPlugin";
import stripAttributes from "strip-attributes";
import { MyValue } from "./types/plate";

interface RichTextEditorProps {
  onChange: (value: any) => void;
}

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: false,
  autoFocus: true,
  readOnly: false,
  placeholder: "Start by typing '/' for commands",
  className: "prose",
};

const plugins = createPlugins<MyValue>(
  [
    ...basicNodesPlugins,
    createTrailingBlockPlugin(trailingBlockPlugin),
    createResetNodePlugin(resetBlockTypePlugin),
    createSoftBreakPlugin(softBreakPlugin),
    createExitBreakPlugin(exitBreakPlugin),
    createComboboxPlugin(),
    createMentionPlugin({
      key: "/",
      // component: MentionElement,
      options: {
        trigger: "/",
        inputCreation: { key: "creationId", value: "main" },
      },
    }),
  ],
  { components: plateUIWithPlaceholders }
);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const [value, setValue] = React.useState<string>();

  const Serialized = () => {
    const editorState = usePlateEditorState()!;
    setValue(
      stripAttributes(
        serializeHtml(editorState, {
          nodes: editorState?.children,
        }),
        { omit: ["placeholder"] }
      )
    );
    return null;
  };

  return (
    <>
      <Plate<MyValue>
        editableProps={editableProps}
        // initialValue={[...basicElementsValue, ...basicMarksValue]}
        onChange={() => onChange(value)}
        plugins={plugins}
      >
        <Serialized />
        <MarkBalloonToolbar />
        <SlashCombobox items={COMMANDS} pluginKey="/" />
      </Plate>
    </>
  );
};
