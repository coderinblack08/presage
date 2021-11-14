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
        className={`flex items-center w-full border shadow-sm rounded-xl ${className}`}
      >
        <div className="h-full ml-4 mr-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Input className={`${inputClassName} border-none pl-0`} {...props} />
      </div>
    );
  }
);
