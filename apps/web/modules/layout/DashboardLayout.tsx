import React from "react";
import { useResizable } from "react-resizable-layout";
import SampleSplitter from "./SampleSplitter";
import { Sidebar } from "./Sidebar";
import { SidebarControls } from "./SidebarControls";

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const { position, isDragging, splitterProps } = useResizable({
    axis: "x",
    initial: 280,
    min: 240,
    max: 440,
  });

  return (
    <div className="flex w-screen min-h-screen">
      <div className={`fixed z-50 top-0 left-0 px-3 pt-[0.85rem]`}>
        <SidebarControls />
      </div>
      <Sidebar width={position} />
      <SampleSplitter isDragging={isDragging} {...splitterProps} />
      <div className="w-full">{children}</div>
    </div>
  );
};
