import { ELEMENT_DEFAULT, TrailingBlockPlugin } from "@udecode/plate";
import { MyPlatePlugin } from "../types/plate";

export const trailingBlockPlugin: Partial<MyPlatePlugin<TrailingBlockPlugin>> =
  {
    options: { type: ELEMENT_DEFAULT },
  };
