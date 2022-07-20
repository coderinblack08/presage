import { plateUI } from "../plate-ui";
import { createMyPlugins } from "../types/plate";

import {
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createParagraphPlugin,
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  createLinkPlugin,
  CodeBlockElement,
  createListPlugin,
  createTodoListPlugin,
} from "@udecode/plate";
import { linkPlugin } from "./linkPlugin";

export const basicElementsPlugins = createMyPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin({ component: CodeBlockElement }),
    createHeadingPlugin(),
    createLinkPlugin(linkPlugin),
    createCodePlugin(),
    createListPlugin(),
    createTodoListPlugin(),
  ],
  {
    components: plateUI,
  }
);

export const basicMarksPlugins = createMyPlugins(
  [
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
  ],
  {
    components: plateUI,
  }
);

export const basicNodesPlugins = createMyPlugins(
  [...basicElementsPlugins, ...basicMarksPlugins],
  {
    components: plateUI,
  }
);
