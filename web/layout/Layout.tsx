import React from "react";
import { Navbar } from "../components/Navbar";
import { usePlayerStore } from "../stores/playing";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  const soundbite = usePlayerStore((x) => x.soundbite);

  return (
    <div>
      <Navbar />
      <div className={soundbite ? "pb-24 lg:pb-16" : ""}>{children}</div>
    </div>
  );
};
