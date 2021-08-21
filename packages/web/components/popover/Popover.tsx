import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Transition } from "@headlessui/react";

interface PopoverProps {
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Popover: React.FC<PopoverProps> = ({
  open,
  setOpen,
  trigger,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const props = open
    ? {
        open,
        onOpenChange: setOpen,
      }
    : {
        open: isOpen,
        onOpenChange: setIsOpen,
      };

  return (
    <RadixPopover.Root {...props}>
      {trigger}
      <RadixPopover.Content sideOffset={8}>{children}</RadixPopover.Content>
    </RadixPopover.Root>
  );
};

export const PopoverTrigger: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <RadixPopover.Trigger className={className} as="div">
      {children}
    </RadixPopover.Trigger>
  );
};
