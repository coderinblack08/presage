import React from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";

interface ScrollAreaProps {
  className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  className,
  children,
}) => {
  return (
    <RadixScrollArea.Root>
      <RadixScrollArea.Viewport className={className}>
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar orientation="horizontal">
        <RadixScrollArea.Thumb />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar orientation="vertical">
        <RadixScrollArea.Thumb />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
};
