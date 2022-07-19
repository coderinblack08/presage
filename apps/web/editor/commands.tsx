import {
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconLetterA,
  IconList,
  IconListNumbers,
  IconQuote,
} from "@tabler/icons";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
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
  { key: "1", text: "Heading 1", data: { icon: <IconH1 />, type: ELEMENT_H1 } },
  { key: "2", text: "Heading 2", data: { icon: <IconH2 />, type: ELEMENT_H2 } },
  {
    key: "3",
    text: "Heading 3",
    data: { icon: <IconH3 />, type: ELEMENT_H3 },
  },
  {
    key: "4",
    text: "Bulleted List",
    data: { icon: <IconList />, type: ELEMENT_UL },
  },
  {
    key: "5",
    text: "Numbered List",
    data: { icon: <IconListNumbers />, type: ELEMENT_OL },
  },
  {
    key: "6",
    text: "Quote",
    data: { icon: <IconQuote />, type: ELEMENT_BLOCKQUOTE },
  },
  {
    key: "7",
    text: "Codeblock",
    data: { icon: <IconCode />, type: ELEMENT_CODE_BLOCK },
  },
];
