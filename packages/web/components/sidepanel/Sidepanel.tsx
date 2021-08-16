import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

interface SidepanelProps {
  trigger: React.ReactNode;
  align?: "right" | "left";
}

export const Sidepanel: React.FC<SidepanelProps> = ({
  trigger,
  align = "left",
  children,
}) => {
  return (
    <Dialog.Root>
      {trigger}
      <Dialog.Overlay>
        <div className="absolute inset-0 h-screen w-screen bg-gray-900/75 backdrop-blur-lg" />
      </Dialog.Overlay>
      <Dialog.Content
        className={`fixed inset-y-0 h-screen ${
          align === "right" ? "right-0" : "left-0"
        }`}
        as={motion.div}
      >
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};

interface SidepanelTriggerProps {
  className?: string;
}

export const SidepanelTrigger: React.FC<SidepanelTriggerProps> = ({
  className,
  children,
}) => {
  return (
    <Dialog.Trigger className={className} as="div">
      {children}
    </Dialog.Trigger>
  );
};
