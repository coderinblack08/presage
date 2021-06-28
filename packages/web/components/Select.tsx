import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SelectProps {}

export const Select: React.FC<
  SelectProps & React.ComponentPropsWithoutRef<"select">
> = ({ children, className, ...props }) => {
  return (
    <div className="relative">
      <select
        className={`appearance-none font-semibold pl-4 pr-8 py-2 bg-gray-600 border border-gray-500 focus:border-gray-500 rounded-lg focus:outline-none focus:ring-2 ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
        <MdKeyboardArrowDown className="w-5 h-5" />
      </div>
    </div>
  );
};
