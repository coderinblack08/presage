import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodePlugin,
  createComboboxPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createListPlugin,
  createMentionPlugin,
  createParagraphPlugin,
  createPlugins,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  Plate,
  TEditableProps,
} from "@udecode/plate";
import React from "react";
import { COMMANDS } from "./commands";
import { basicMarksValue } from "./elements/BasicElementsValue";
import { MarkBalloonToolbar } from "./elements/MarkBalloonToolbar";
import { SlashCombobox } from "./elements/SlashCombobox";
import { basicElementsValue } from "./marks/BasicMarksValue";
import { plateUI } from "./plate-ui";
import { exitBreakPlugin } from "./plugins/exitBreakPlugin";
import { resetBlockTypePlugin } from "./plugins/resetBlockTypePlugin";
import { softBreakPlugin } from "./plugins/softBreakPlugin";
import { trailingBlockPlugin } from "./plugins/trailingBlockPlugin";
import { MyValue } from "./types/plate";

interface RichTextEditorProps {}

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: false,
  autoFocus: false,
  readOnly: false,
  placeholder: "Type something b*tch…",
};

const plugins = createPlugins<MyValue>(
  [
    createTrailingBlockPlugin(trailingBlockPlugin),
    createResetNodePlugin(resetBlockTypePlugin),
    createSoftBreakPlugin(softBreakPlugin),
    createExitBreakPlugin(exitBreakPlugin),

    createParagraphPlugin(),
    createBlockquotePlugin(),
    // createCodeBlockPlugin({
    //   // You can either pass a component per plugin
    //   component: CodeBlockElement,
    // }),
    createHeadingPlugin(),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),

    createListPlugin(),
    createTodoListPlugin(),

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
  { components: plateUI }
);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({}) => {
  return (
    <Plate<MyValue>
      editableProps={editableProps}
      initialValue={[...basicElementsValue, ...basicMarksValue]}
      plugins={plugins}
    >
      <MarkBalloonToolbar />
      <SlashCombobox items={COMMANDS} pluginKey="/" />
    </Plate>
  );
};
