import React from "react";
import { HiOutlineSelector } from "react-icons/hi";

interface SelectProps {
  color?: "gray" | "transparent";
}

export const Select: React.FC<
  SelectProps & React.ComponentPropsWithoutRef<"select">
> = ({ children, className, color = "white", ...props }) => {
  return (
    <div className="relative h-full">
      <select
        className={`appearance-none font-medium pl-5 pr-12 py-1.5 ${
          color === "white" ? "bg-white shadow" : "bg-transparent"
        } rounded-lg focus:outline-none focus:ring-2 ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
        <HiOutlineSelector className="w-4 h-4" />
      </div>
    </div>
  );
};
