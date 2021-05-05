import React from "react";
import { Navbar } from "../../components/Navbar";
import { LeftSideBar } from "./LeftSideBar";
import { RightAside } from "./RightAside";
import { useGridLayout } from "./useGridLayout";

const Layout: React.FC = ({ children }) => {
  const gridTemplateColumns = useGridLayout();

  return (
    <div>
      <Navbar />
      <div
        className="grid gap-16 md:gap-24 max-w-[98em] mx-auto py-12 lg:py-14 px-6"
        style={{ gridTemplateColumns }}
      >
        <LeftSideBar />
        <main>{children}</main>
        <RightAside />
      </div>
    </div>
  );
};

export default Layout;
