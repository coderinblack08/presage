import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import { DraftSidebar } from "./DraftSidebar";

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex items-start bg-white w-screen h-screen">
      <AnimateSharedLayout>
        <DraftSidebar />
        <motion.div
          className="relative w-full h-screen overflow-y-scroll bg-white md:px-12"
          transition={{ type: "keyframes", ease: "easeOut" }}
          layout
        >
          {children}
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
};
