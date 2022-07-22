import * as PopoverPrimitive from "@radix-ui/react-popover";
import { IconX } from "@tabler/icons";
import React from "react";
import { Button } from "..";

const cx = (...args: string[]) => args.join(" ");

interface PopoverProps {
  trigger?: React.ReactNode;
  className?: string;
}

const items = [
  {
    id: "width",
    label: "Width",
    defaultValue: "100%",
  },
  {
    id: "max-width",
    label: "Max. width",
    defaultValue: "300px",
  },
  {
    id: "height",
    label: "Height",
    defaultValue: "25px",
  },
  {
    id: "max-height",
    label: "Max. height",
    defaultValue: "none",
  },
];

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  className,
  children,
}) => {
  return (
    <div className="relative inline-block text-left">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={8}
          className={cx(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "w-56 rounded-lg p-4 shadow-md md:w-56 border",
            "bg-white",
            className || ""
          )}
        >
          {children}
          <PopoverPrimitive.Close
            className={cx(
              "absolute top-2 right-2 inline-flex items-center justify-center rounded-full p-1",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            <IconX className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
};
