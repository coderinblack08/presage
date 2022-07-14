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
  subMenu?: boolean;
  sideOffset?: number;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  open,
  align,
  side,
  className,
  alignOffset,
  sideOffset = 8,
  children,
  subMenu = false,
  ...props
}) => {
  return (
    <DropdownMenu.Root open={open}>
      {subMenu ? (
        trigger
      ) : (
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      )}
      <DropdownMenu.Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
        side={side}
        asChild
        {...props}
      >
        <div
          className={`bg-white shadow-sm border rounded-xl w-64 overflow-hidden py-1.5 ${className}`}
        >
          {children}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const MenuDivider: React.FC = () => (
  <DropdownMenu.Separator className="border-b my-1.5" />
);

interface MenuItemProps {
  icon?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  className?: string;
  trigger?: boolean;
  closeOnSelect?: boolean;
  onClick?: (event: Event) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  children,
  onClick,
  disabled,
  trigger = false,
  closeOnSelect = true,
  href,
  className,
  ...props
}) => {
  const T = !trigger ? DropdownMenu.Item : DropdownMenu.TriggerItem;

  return (
    <T
      disabled={disabled}
      onSelect={(e) => {
        if (!closeOnSelect) {
          e.preventDefault();
        }
        if (href) {
          window.location.href = href;
        }
        if (onClick) {
          onClick(e as any);
        }
      }}
      className={`group ${
        icon ? "flex items-center" : "block"
      } select-none px-4 py-1.5 w-full cursor-pointer focus:outline-none focus:bg-gray-100 text-left ${className}`}
      {...props}
      asChild
    >
      <button>
        {icon ? (
          <div className="text-gray-400 mr-2.5 group-focus:text-gray-900">
            {icon}
          </div>
        ) : null}
        <div className="text-gray-600 group-focus:text-gray-900">
          {children}
        </div>
      </button>
    </T>
  );
};
