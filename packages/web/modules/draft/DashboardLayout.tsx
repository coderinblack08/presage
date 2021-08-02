import { motion, AnimateSharedLayout } from "framer-motion";
import React from "react";
import { MessageSidebar } from "../message/MessageSidebar";
import { DraftSidebar } from "./DraftSidebar";

interface DashboardLayoutProps {
  message?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  message = false,
}) => {
  return (
    <div className="flex items-start bg-white w-screen h-screen">
      <AnimateSharedLayout>
        {message ? <MessageSidebar /> : <DraftSidebar />}
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
