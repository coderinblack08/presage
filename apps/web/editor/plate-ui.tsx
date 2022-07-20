import { createPlateUI } from "@udecode/plate";
import { withStyledPlaceHolders } from "./plugins/withStyledPlaceholders";

export const plateUI = createPlateUI({
  // [ELEMENT_CODE_BLOCK]: null as any,
});

export const plateUIWithPlaceholders = withStyledPlaceHolders(plateUI);
