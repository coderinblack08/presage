import React from "react";

interface SelectProps {}

export const Select: React.FC<
  SelectProps & React.ComponentPropsWithoutRef<"select">
> = ({ children, className, ...props }) => {
  return (
    <select
      className={`font-semibold px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
