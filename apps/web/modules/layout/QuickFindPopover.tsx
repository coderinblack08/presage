import { IconSearch } from "@tabler/icons";
import React from "react";
import { Button } from "ui";

interface QuickFindPopoverProps {}

export const QuickFindPopover: React.FC<QuickFindPopoverProps> = ({}) => {
  return (
    <Button
      className="w-full !justify-start font-medium px-4 text-gray-400"
      variant="outline"
      icon={<IconSearch size={20} className="mr-1 -mb-0.5 " />}
    >
      Jump to...
    </Button>
  );
};
