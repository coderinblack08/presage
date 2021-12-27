import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type * as RadixDropdownTypes from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

interface MenuProps {
  open?: boolean;
  onOpenChange?: RadixDropdownTypes.DropdownMenuProps["onOpenChange"];
  side?: RadixDropdownTypes.DropdownMenuContentProps["side"];
  align?: RadixDropdownTypes.DropdownMenuContentProps["align"];
  children?: React.ReactNode;
  alignOffset?: number;
  trigger: React.ReactNode;
  className?: string;
  sideOffset?: number;
}

export const Menu: React.FC<MenuProps> = ({
  className,
  trigger,
  open,
  align,
  side,
  alignOffset,
  sideOffset = 12,
  children,
  ...props
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
        side={side}
        asChild
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`py-1.5 bg-white ${
            align === "start"
              ? "origin-top-left"
              : align === "end"
              ? "origin-top-right"
              : "origin-top"
          } w-56 border border-gray-200 shadow-lg rounded-xl ${className}`}
        >
          {children}
        </motion.div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

interface MenuItemProps {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  closeOnSelect?: boolean;
  onClick?: (event: Event) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  children,
  className,
  isDisabled = false,
  closeOnSelect,
  onClick,
}) => {
  return (
    <DropdownMenu.Item
      disabled={isDisabled}
      onSelect={(e) => {
        if (!closeOnSelect) {
          e.preventDefault();
        }
        if (onClick) {
          onClick(e);
        }
      }}
      asChild
    >
      <button
        className={`flex cursor-pointer items-center space-x-2 select-none py-1.5 px-4 text-gray-600 w-full rounded-lg-border focus:bg-gray-100 focus:outline-none ${className}`}
      >
        {icon && <div className="flex-shrink-0 text-gray-400 mr-2">{icon}</div>}
        {children}
      </button>
    </DropdownMenu.Item>
  );
};

export const MenuDivider: React.FC = () => (
  <DropdownMenu.Separator className="border-b my-1.5" />
);
