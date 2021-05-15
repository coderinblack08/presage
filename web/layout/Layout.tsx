import React from "react";
import { Navbar } from "../components/Navbar";
import {
  SoundbiteHeader,
  SoundbiteHeaderProps,
} from "../components/SoundBiteHeader";
import { usePlayerStore } from "../stores/playing";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps & SoundbiteHeaderProps> = ({
  children,
  ...props
}) => {
  const soundbite = usePlayerStore((x) => x.soundbite);

  return (
    <div>
      <Navbar />
      <div className={soundbite ? "pb-24 lg:pb-16" : ""}>
        <div className="lg:max-w-7xl xl:max-w-8xl mx-auto w-full mt-16 px-6">
          <div className="px-6 pb-20 max-w-4xl mx-auto">
            <SoundbiteHeader {...props} />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};
