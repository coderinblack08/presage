import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownDividerProps {}

export const DropdownDivider: React.FC<DropdownDividerProps> = ({}) => {
  return <DropdownMenu.Separator className="border-b my-2" />;
};
