import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  withPlaceholders,
} from "@udecode/plate";

export const withStyledPlaceHolders = (components: any) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: "Start by typing '/' for commands",
      hideOnBlur: true,
    },
    { key: ELEMENT_H1, placeholder: "Untitled", hideOnBlur: false },
    { key: ELEMENT_H2, placeholder: "Untitled", hideOnBlur: false },
    { key: ELEMENT_H3, placeholder: "Untitled", hideOnBlur: false },
  ]);
