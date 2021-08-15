import React, { ComponentPropsWithoutRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

interface DropdownProps {
  trigger: React.ReactNode;
  wrapperClassName?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  wrapperClassName,
  className,
  ...props
}) => {
  return (
    <DropdownMenu.Root>
      <div className={wrapperClassName}>
        {trigger}
        <DropdownMenu.Content
          sideOffset={8}
          className={`bg-white border rounded-lg shadow w-56 overflow-hidden py-2 ${className}`}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          as={motion.div}
          {...props}
        />
      </div>
    </DropdownMenu.Root>
  );
};
