import React, { SelectHTMLAttributes } from "react";

interface SelectProps {}

export const Select: React.FC<
  SelectProps & SelectHTMLAttributes<HTMLSelectElement>
> = ({ className, children }) => {
  return (
    <select
      className={`form-select select-none pl-4 pr-10 py-2 rounded-lg focus:ring-purple-100 focus:ring focus:border-purple-300 border-gray-200 ${className}`}
    >
      {children}
    </select>
  );
};
