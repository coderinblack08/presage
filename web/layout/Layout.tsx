import React from "react";
import {
  SoundbiteHeader,
  SoundbiteHeaderProps,
} from "../components/SoundBiteHeader";
import { Sidebar } from "./Sidebar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps & SoundbiteHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <div>
      <div className=" lg:max-w-7xl xl:max-w-8xl mx-auto w-full mt-16 px-6">
        <div className="flex items-start justify-center space-x-20">
          <Sidebar />
          <main className="w-full">
            <SoundbiteHeader {...props} />
            <div className="px-6 pb-20 max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
