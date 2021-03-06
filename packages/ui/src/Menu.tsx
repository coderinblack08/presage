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
  style?: React.CSSProperties;
  onCloseAutoFocus?: boolean;
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
  style,
  onCloseAutoFocus,
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
        onCloseAutoFocus={
          onCloseAutoFocus ? (e) => e.preventDefault() : undefined
        }
        style={style}
        alignOffset={alignOffset}
        align={align}
        side={side}
        asChild
        {...props}
      >
        <div
          className={`bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm border rounded-xl w-64 overflow-hidden p-1 ${className}`}
        >
          {children}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const MenuDivider: React.FC = () => (
  <DropdownMenu.Separator className="border-b dark:border-gray-800 my-1" />
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
      onClick={(e) => e.stopPropagation()}
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
      className={`group rounded-lg ${
        icon ? "flex items-center" : "block"
      } select-none px-4 py-1.5 w-full cursor-pointer focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 text-left ${className}`}
      {...props}
      asChild
    >
      <button>
        {icon ? (
          <div className="text-gray-400 dark:text-gray-600 mr-2.5 group-focus:text-gray-900 dark:group-focus:text-gray-100">
            {icon}
          </div>
        ) : null}
        <div className="text-gray-600 dark:text-gray-400 group-focus:text-gray-900 dark:group-focus:text-gray-100">
          {children}
        </div>
      </button>
    </T>
  );
};

export const SubMenu: React.FC<{ trigger: React.ReactNode }> = ({
  trigger,
  children,
}) => {
  return (
    <DropdownMenu.Sub>
      {trigger}
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent>{children}</DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};
