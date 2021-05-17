import React from "react";
import { usePlayerStore } from "../stores/playing";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ className, ...props }) => {
  const soundbite = usePlayerStore((x) => x.soundbite);

  return (
    <div
      className={`${soundbite ? "pb-24 lg:pb-16" : ""} ${className}`}
      {...props}
    />
  );
};
