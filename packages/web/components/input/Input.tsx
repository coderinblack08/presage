import React from "react";

export interface InputProps {
  error?: boolean;
  outline?: boolean;
  gray?: boolean;
  shortcut?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<
  React.ComponentPropsWithRef<"input"> & InputProps
> = ({ className, error, outline, icon, shortcut, ...props }) => {
  const styles = `px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring focus:ring-gray-300 w-full ${
    error ? "ring-1 ring-opacity-75 ring-red" : ""
  } ${outline ? "border shadow-sm focus:border-gray-500/50" : "shadow"} ${
    icon ? "pl-12" : ""
  }`;

  return (
    <div className="inline-block relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 mx-4 h-full flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      {shortcut && (
        <div className="absolute inset-y-0 h-full right-0 flex items-center pointer-events-none pr-2">
          <span className="border bg-gray-100 rounded-md px-2.5 py-0.5 text-sm">
            {shortcut}
          </span>
        </div>
      )}
      <input className={`${styles} ${className}`} {...props} />
    </div>
  );
};
