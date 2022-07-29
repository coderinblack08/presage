import {
  createComboboxPlugin,
  createDeserializeHtmlPlugin,
  createExitBreakPlugin,
  createMentionPlugin,
  createPlugins,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createTrailingBlockPlugin,
  deserializeHtmlElement,
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
import { basicMarksValue } from "./elements/BasicElementsValue";
import { basicElementsValue } from "./marks/BasicMarksValue";
import { useField } from "formik";

export interface RichTextEditorProps { }

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: false,
  autoFocus: true,
  readOnly: false,
  placeholder: "Start by typing '/' for commands",
  className: "pb-4 md:pb-8 lg:pb-20",
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
    createDeserializeHtmlPlugin(),
  ],
  { components: plateUIWithPlaceholders }
);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ }) => {
  const [value, setValue] = React.useState<string>("");
  const [{ value: editorValue }, _, { setValue: setEditorValue }] =
    useField<string>("content");

  const Serialized = () => {
    const editorState = usePlateEditorState()!;
    try {
      const serializedHTML = serializeHtml(editorState, {
        nodes: editorState?.children,
      });
      setValue(stripAttributes(serializedHTML, { omit: ["placeholder"] }));
    } catch (error) { }
    return null;
  };

  return (
    <>
      <Plate<MyValue>
        editableProps={editableProps}
        // initialValue={editorValue}
        initialValue={[...basicElementsValue, ...basicMarksValue]}
        // onChange={() => setEditorValue(value)}
        plugins={plugins}
      >
        <Serialized />
        <MarkBalloonToolbar />
        <SlashCombobox items={COMMANDS} pluginKey="/" />
      </Plate>
    </>
  );
};
