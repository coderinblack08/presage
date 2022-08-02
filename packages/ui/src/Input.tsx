import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  textarea?: boolean;
  size?: "sm" | "md";
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textarea, className, size = "md", label, icon, ...props }, ref) => {
    const styles = `${
      size === "md" ? "text-base px-4 py-2" : "text-sm px-3 py-2"
    } block bg-white dark:border-2 dark:border-gray-800 dark:bg-gray-900 rounded-xl border shadow-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 dark:text-white w-full transition focus-visible:ring focus-visible:ring-gray-300 ${
      textarea && "resize-none h-32"
    } ${icon ? "pl-10" : ""} ${className}`;
    let output;
    if (textarea) {
      output = (
        <textarea ref={ref as any} className={styles} {...(props as any)} />
      );
    } else {
      output = (
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-300 dark:text-gray-600">{icon}</span>
          </div>
          <input autoComplete="off" ref={ref} className={styles} {...props} />
        </div>
      );
    }
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gray-400 dark:text-gray-600 font-bold text-sm mb-2">
            {label}
          </label>
        )}
        {output}
      </div>
    );
  }
);

Input.displayName = "Input";
