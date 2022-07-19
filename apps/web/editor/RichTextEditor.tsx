import {
  CodeBlockElement,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createComboboxPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMentionPlugin,
  createNormalizeTypesPlugin,
  createParagraphPlugin,
  createPlugins,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  ELEMENT_H1,
  Plate,
  TEditableProps,
} from "@udecode/plate";
import React, { useEffect, useMemo, useRef } from "react";
import { COMMANDS } from "./commands";
import { MarkBalloonToolbar } from "./elements/MarkBalloonToolbar";
import { SlashCombobox } from "./elements/SlashCombobox";
import { plateUI } from "./plate-ui";
import { exitBreakPlugin } from "./plugins/exitBreakPlugin";
import { linkPlugin } from "./plugins/linkPlugin";
import { resetBlockTypePlugin } from "./plugins/resetBlockTypePlugin";
import { softBreakPlugin } from "./plugins/softBreakPlugin";
import { trailingBlockPlugin } from "./plugins/trailingBlockPlugin";
import { MyValue } from "./types/plate";

interface RichTextEditorProps {}

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: false,
  autoFocus: true,
  readOnly: false,
  placeholder: "Type `/` for commands",
  className: "prose",
};

const plugins = createPlugins<MyValue>(
  [
    createTrailingBlockPlugin(trailingBlockPlugin),
    createResetNodePlugin(resetBlockTypePlugin),
    createSoftBreakPlugin(softBreakPlugin),
    createExitBreakPlugin(exitBreakPlugin),

    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin({
      component: CodeBlockElement,
    }),
    createHeadingPlugin(),
    createLinkPlugin(linkPlugin),

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
    <>
      <Plate<MyValue>
        editableProps={editableProps}
        // initialValue={[...basicElementsValue, ...basicMarksValue]}
        plugins={plugins}
      >
        <MarkBalloonToolbar />
        <SlashCombobox items={COMMANDS} pluginKey="/" />
      </Plate>
    </>
  );
};
