import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import create from "zustand";
import { combine } from "zustand/middleware";
import shallow from "zustand/shallow";
import { Button } from "./Button";
import { UserDropdown } from "./UserDropdown";

interface SidebarProps {
  footer?: React.ReactNode;
}

export const useSidebarOpen = create(
  combine({ open: true }, (set) => ({
    setOpen: (state: boolean) => set({ open: state }),
  }))
);

export const Sidebar: React.FC<SidebarProps> = ({ footer, children }) => {
  const [open, setOpen] = useSidebarOpen((x) => [x.open, x.setOpen], shallow);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.nav
          className="flex flex-col justify-between bg-gray-50 border-r border-gray-100 border-gray-200/50 max-w-xs w-full h-screen overflow-y-scroll"
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -500 }}
          transition={{ type: "keyframes", ease: "easeInOut" }}
          layout
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <UserDropdown fullName />
              <Button
                icon={
                  <HiOutlineChevronDoubleLeft className="w-5 h-5 text-gray-600" />
                }
                color="transparent"
                size="none"
                onClick={() => setOpen(false)}
              />
            </div>
            {children}
          </div>
          {footer}
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
};
