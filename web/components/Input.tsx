import React, { forwardRef } from "react";

interface InputProps {
  icon?: React.ReactNode;
  shortcut?: string;
  isTextarea?: boolean;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ isTextarea, icon, className, shortcut, ...props }, ref) => {
  return (
    <div
      className={`relative items-center flex w-full ${
        icon ? "bg-white border rounded-lg px-4 py-2" : ""
      }`}
    >
      {icon && (
        <span className="text-gray-400 flex items-center h-full pointer-events-none">
          {icon}
        </span>
      )}
      {React.createElement(isTextarea ? "textarea" : "input", {
        ref,
        className: `mt-0 w-full resize-none select-none focus:outline-none ${
          icon
            ? "pl-2"
            : "border px-4 py-2 focus:ring focus:ring-gray-200 rounded-lg placeholder-gray-400 font-normal"
        } font-normal ${className}`,
        ...props,
      })}
      {shortcut && (
        <div className="absolute inset-y-0 h-full right-0 flex items-center space-x-1.5 pointer-events-none pr-2">
          {shortcut.split("").map((key, index) => (
            <kbd
              key={index}
              className="border-b-2 bg-gray-50 border rounded-md px-2 py-0.5 text-sm text-gray-600"
            >
              {key}
            </kbd>
          ))}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
