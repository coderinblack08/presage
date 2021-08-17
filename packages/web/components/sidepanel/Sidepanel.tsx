import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

interface SidepanelProps {
  trigger: React.ReactNode;
  align?: "right" | "left";
}

export const Sidepanel: React.FC<SidepanelProps> = ({
  trigger,
  align = "left",
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger}
      <Dialog.Overlay>
        <div className="fixed inset-0 h-screen w-screen bg-black/75 backdrop-blur-lg" />
      </Dialog.Overlay>
      <Dialog.Content
        className={`fixed inset-y-0 h-screen ${
          align === "right" ? "right-0" : "left-0"
        }`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "keyframes" }}
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
