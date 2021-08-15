import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface DropdownItemProps {
  icon?: React.ReactNode;
  children: string;
}

export const DropdownItem: React.FC<
  DropdownItemProps &
    Omit<
      DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      "as" | "onSelect" | "disabled" | "textValue"
    >
> = ({ icon, children, ...props }) => {
  return (
    <DropdownMenu.Item
      className={`${
        icon ? "flex items-center" : ""
      } px-4 py-2 focus:outline-none focus:bg-gray-100 w-full text-left`}
      as="button"
      {...props}
    >
      {icon ? <div className="mr-2">{icon}</div> : null}
      <div>{children}</div>
    </DropdownMenu.Item>
  );
};
