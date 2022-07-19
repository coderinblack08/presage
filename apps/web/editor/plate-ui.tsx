import { createPlateUI, ELEMENT_CODE_BLOCK } from "@udecode/plate";
import { withStyledPlaceHolders } from "./plugins/withStyledPlaceholders";

export const plateUI = withStyledPlaceHolders(
  createPlateUI({
    // [ELEMENT_CODE_BLOCK]: null as any,
  })
);
