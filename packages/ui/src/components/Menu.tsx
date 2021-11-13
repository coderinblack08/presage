import React from "react";
import type * as RadixDropdownTypes from "@radix-ui/react-dropdown-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export interface MenuProps {
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
  trigger,
  open,
  align,
  side,
  className,
  alignOffset,
  sideOffset = 12,
  children,
  ...props
}) => {
  return (
    <DropdownMenu.Root open={open}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
        side={side}
        asChild
        {...props}
      >
        <div
          className={`border border-gray-700/50 rounded-xl w-60 overflow-hidden py-1.5 ${className}`}
        >
          {children}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const MenuDivider: React.FC = () => (
  <DropdownMenu.Separator className="border-b border-gray-700/50 my-1.5" />
);

interface MenuItemProps {
  icon?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: (event: Event) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  children,
  onClick,
  disabled,
  href,
  ...props
}) => {
  return (
    <DropdownMenu.Item
      disabled={disabled}
      onSelect={(e) => {
        if (href) window.location.href = href;
        if (onClick) onClick(e);
      }}
      className={`group ${
        icon ? "flex items-center" : "block"
      } select-none px-4 py-1.5 cursor-pointer focus:outline-none focus:bg-gray-800 w-full text-left`}
      {...props}
      asChild
    >
      <button>
        {icon ? (
          <div className="text-gray-500 mr-2 group-focus:text-gray-100">
            {icon}
          </div>
        ) : null}
        <div className="text-gray-300 group-focus:text-gray-100">
          {children}
        </div>
      </button>
    </DropdownMenu.Item>
  );
};
