import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  textarea?: boolean;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textarea, className, size = "md", icon, ...props }, ref) => {
    const styles = `${
      size === "md" ? "text-base px-4 py-2" : "text-sm px-3 py-2"
    } block bg-white dark:border-2 dark:border-gray-800 dark:bg-gray-900 rounded-xl border shadow-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 dark:text-white w-full transition ${
      textarea && "resize-none h-32"
    } ${icon ? "pl-10" : ""} ${className}`;
    if (textarea) {
      return (
        <textarea ref={ref as any} className={styles} {...(props as any)} />
      );
    } else {
      return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-300 dark:text-gray-600">{icon}</span>
          </div>
          <input autoComplete="off" ref={ref} className={styles} {...props} />
        </div>
      );
    }
  }
);

Input.displayName = "Input";
