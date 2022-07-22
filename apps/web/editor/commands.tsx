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
    data: {
      icon: <IconLetterA size={16} className="text-gray-500" />,
      type: ELEMENT_PARAGRAPH,
    },
  },
  {
    key: counter(),
    text: "Heading",
    data: {
      icon: <IconH1 size={16} className="text-gray-500" />,
      type: ELEMENT_H2,
    },
  },
  {
    key: counter(),
    text: "Bulleted List",
    data: {
      icon: <IconList size={16} className="text-gray-500" />,
      type: ELEMENT_UL,
    },
  },
  {
    key: counter(),
    text: "Numbered List",
    data: {
      icon: <IconListNumbers size={16} className="text-gray-500" />,
      type: ELEMENT_OL,
    },
  },
  {
    key: counter(),
    text: "Quote",
    data: {
      icon: <IconQuote size={16} className="text-gray-500" />,
      type: ELEMENT_BLOCKQUOTE,
    },
  },
  {
    key: counter(),
    text: "Codeblock",
    data: {
      icon: <IconCode size={16} className="text-gray-500" />,
      type: ELEMENT_CODE_BLOCK,
    },
  },
];
