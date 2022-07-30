import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  textarea?: boolean;
  size: "sm" | "md";
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textarea, className, size = "md", icon, ...props }, ref) => {
    const styles = `${
      size === "md" ? "text-base px-4 py-2" : "text-sm px-3 py-2"
    } bg-white dark:bg-gray-900 dark:border-gray-800 rounded-xl border shadow-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 dark:text-white w-full transition ${
      textarea && "resize-none h-32"
    } ${className}`;
    if (textarea) {
      return (
        <textarea ref={ref as any} className={styles} {...(props as any)} />
      );
    } else {
      return (
        <input autoComplete="off" ref={ref} className={styles} {...props} />
      );
    }
  }
);

Input.displayName = "Input";
