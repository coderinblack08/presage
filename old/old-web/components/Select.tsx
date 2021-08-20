import React from "react";

interface SelectProps {
  color?: "gray" | "transparent";
}

export const Select: React.FC<
  SelectProps & React.ComponentPropsWithoutRef<"select">
> = ({ children, className, color = "white", ...props }) => {
  return (
    <select
      className={`form-select border-none focus:ring-transparent focus:border-none font-medium px-4 py-2 ${
        color === "white" ? "bg-white shadow" : "bg-transparent"
      } rounded-lg focus:outline-none focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
