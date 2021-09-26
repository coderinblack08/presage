import type * as RadixDropdownTypes from "@radix-ui/react-dropdown-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

interface DropdownRootProps {
  open?: boolean;
  onOpenChange?: RadixDropdownTypes.DropdownMenuOwnProps["onOpenChange"];
  side?: RadixDropdownTypes.DropdownMenuContentOwnProps["side"];
  align?: RadixDropdownTypes.DropdownMenuContentOwnProps["align"];
  children?: React.ReactNode;
  alignOffset?: number;
  trigger: React.ReactNode;
  className?: string;
  sideOffset?: number;
}

export const Dropdown: React.FC<DropdownRootProps> = ({
  trigger,
  open,
  align,
  side,
  className,
  alignOffset,
  sideOffset = 8,
  children,
  ...props
}) => {
  return (
    <DropdownMenu.Root open={open}>
      {trigger}
      <DropdownMenu.Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
        side={side}
        className={`bg-white border rounded-lg shadow w-56 overflow-hidden py-2 ${className}`}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        as={motion.div}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

interface DropdownDividerProps {}

export const DropdownDivider: React.FC<DropdownDividerProps> = ({}) => {
  return <DropdownMenu.Separator className="border-b my-2" />;
};

interface DropdownItemProps {
  icon?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: (event: Event) => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
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
      } px-4 py-2 cursor-pointer focus:outline-none focus:bg-gray-100 w-full text-left`}
      as="button"
      {...props}
    >
      {icon ? (
        <div className="mr-2 text-gray-600 group-focus:text-gray-900">
          {icon}
        </div>
      ) : null}
      <div className="text-gray-600 group-focus:text-gray-900">{children}</div>
    </DropdownMenu.Item>
  );
};

interface DropdownTriggerProps {
  className?: string;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  className,
  children,
}) => {
  return (
    <DropdownMenu.Trigger className={className} as="div">
      {children}
    </DropdownMenu.Trigger>
  );
};
