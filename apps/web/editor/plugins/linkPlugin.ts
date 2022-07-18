import { LinkPlugin, PlateFloatingLink } from "@udecode/plate";
import { MyPlatePlugin } from "../types/plate";

export const linkPlugin: Partial<MyPlatePlugin<LinkPlugin>> = {
  renderAfterEditable: PlateFloatingLink,
};
