import { plateUI } from "../plate-ui";
import { createMyPlugins } from "../types/plate";

import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createParagraphPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTodoListPlugin,
  createUnderlinePlugin,
} from "@udecode/plate";
import { linkPlugin } from "./linkPlugin";

export const basicElementsPlugins = createMyPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
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
