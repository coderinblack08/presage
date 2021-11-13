import React, { forwardRef } from "react";
import { Input } from "./Input";

export interface IconInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  icon?: React.ReactNode;
  inputClassName?: string;
}

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, inputClassName, icon, ...props }) => {
    return (
      <div
        className={`flex items-center w-full border focus-within:ring-2 focus-within:ring-purple-500/50 border-gray-700/50 rounded-xl ${className}`}
      >
        <div className="h-full mx-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Input
          focusRing={false}
          className={`${inputClassName} border-none pl-0`}
          {...props}
        />
      </div>
    );
  }
);
