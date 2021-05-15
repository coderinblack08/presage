import React from "react";
import { usePlayerStore } from "../stores/playing";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  const soundbite = usePlayerStore((x) => x.soundbite);

  return (
    <div className={`${soundbite ? "pb-24 lg:pb-16" : ""} px-6`} {...props}>
      {children}
    </div>
  );
};
