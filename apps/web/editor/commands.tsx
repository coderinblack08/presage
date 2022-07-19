import {
  IconCode,
  IconH1,
  IconH2,
  IconLetterA,
  IconList,
  IconListNumbers,
  IconQuote,
} from "@tabler/icons";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
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

const iota = () => {
  let count = 0;
  return () => (count++).toString();
};

const counter = iota();

export const COMMANDS: TComboboxItem<CommandItemProps>[] = [
  {
    key: counter(),
    text: "Paragraph",
    data: { icon: <IconLetterA />, type: ELEMENT_PARAGRAPH },
  },
  {
    key: counter(),
    text: "Heading",
    data: { icon: <IconH1 />, type: ELEMENT_H2 },
  },
  {
    key: counter(),
    text: "Subheading",
    data: { icon: <IconH2 />, type: ELEMENT_H3 },
  },
  {
    key: counter(),
    text: "Bulleted List",
    data: { icon: <IconList />, type: ELEMENT_UL },
  },
  {
    key: counter(),
    text: "Numbered List",
    data: { icon: <IconListNumbers />, type: ELEMENT_OL },
  },
  {
    key: counter(),
    text: "Quote",
    data: { icon: <IconQuote />, type: ELEMENT_BLOCKQUOTE },
  },
  {
    key: counter(),
    text: "Codeblock",
    data: { icon: <IconCode />, type: ELEMENT_CODE_BLOCK },
  },
];
