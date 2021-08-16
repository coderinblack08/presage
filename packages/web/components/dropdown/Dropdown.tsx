import type * as RadixDropdownTypes from "@radix-ui/react-dropdown-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

interface DropdownRootProps {
  open?: boolean;
  onOpenChange?: RadixDropdownTypes.DropdownMenuOwnProps["onOpenChange"];
  side?: RadixDropdownTypes.DropdownMenuContentOwnProps["side"];
  align?: RadixDropdownTypes.DropdownMenuContentOwnProps["align"];
  children?: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownRootProps> = ({
  trigger,
  open,
  className,
  children,
  ...props
}) => {
  return (
    <DropdownMenu.Root open={open}>
      {trigger}
      <DropdownMenu.Content
        sideOffset={8}
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
      onSelect={onClick}
      className={`${
        icon ? "flex items-center" : ""
      } px-4 py-2 focus:outline-none focus:bg-gray-100 w-full text-left`}
      as={href ? "a" : "button"}
      {...props}
    >
      {icon ? <div className="mr-2">{icon}</div> : null}
      <div>{children}</div>
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
