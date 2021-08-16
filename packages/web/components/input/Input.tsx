import React from "react";

export interface InputProps {
  error?: boolean;
  outline?: boolean;
  gray?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<
  React.ComponentPropsWithRef<"input"> & InputProps
> = ({ className, error, outline, icon, ...props }) => {
  const styles = `px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none w-full ${
    error ? "ring-1 ring-opacity-75 ring-red" : ""
  } ${outline ? "border shadow-sm" : "shadow"} ${icon ? "pl-8" : ""}`;

  return (
    <div className="relative">
      {icon && (
        <div className="pl-4 absolute inset-y-0 left-0 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input className={`${styles} ${className}`} {...props} />
    </div>
  );
};
