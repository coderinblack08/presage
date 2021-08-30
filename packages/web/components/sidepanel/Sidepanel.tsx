import React from "react";
import * as Portal from "@radix-ui/react-portal";
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
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div>{trigger}</div>
      <Portal.Root>
        <Dialog.Overlay>
          <div className="fixed inset-0 h-screen w-screen bg-black/75" />
        </Dialog.Overlay>
        <Dialog.Content>
          <motion.div
            className={`fixed inset-y-0 h-screen ${
              align === "right" ? "right-0" : "left-0"
            }`}
            initial={{ x: align === "right" ? 300 : -300 }}
            animate={{ x: 0 }}
            exit={{ x: align === "right" ? 300 : -300 }}
            transition={{ type: "keyframes" }}
          >
            {children}
          </motion.div>
        </Dialog.Content>
      </Portal.Root>
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
