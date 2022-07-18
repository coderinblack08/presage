import {
  IconH1,
  IconLetterA,
  IconList,
  IconListNumbers,
  IconQuote,
} from "@tabler/icons";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  TComboboxItem,
} from "@udecode/plate";

export type CommandItemProps = {
  icon: React.ReactNode;
  type: string;
};

export const COMMANDS: TComboboxItem<CommandItemProps>[] = [
  {
    key: "0",
    text: "Paragraph",
    data: { icon: <IconLetterA />, type: ELEMENT_PARAGRAPH },
  },
  { key: "1", text: "Heading", data: { icon: <IconH1 />, type: ELEMENT_H1 } },
  {
    key: "2",
    text: "Bulleted List",
    data: { icon: <IconList />, type: ELEMENT_UL },
  },
  {
    key: "3",
    text: "Numbered List",
    data: { icon: <IconListNumbers />, type: ELEMENT_OL },
  },
  {
    key: "4",
    text: "Quote",
    data: { icon: <IconQuote />, type: ELEMENT_BLOCKQUOTE },
  },
];
