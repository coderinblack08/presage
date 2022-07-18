import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_DEFAULT,
  ELEMENT_TODO_LI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ResetNodePlugin,
} from "@udecode/plate";
import { MyPlatePlugin } from "../types/plate";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_DEFAULT,
};

export const resetBlockTypePlugin: Partial<MyPlatePlugin<ResetNodePlugin>> = {
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: "Enter",
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: "Backspace",
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
};
