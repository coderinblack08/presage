import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  focusRing?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textarea, className, icon, focusRing = true, ...props }, ref) => {
    const styles = `px-4 py-2 rounded-xl border border-gray-700/50 focus:outline-none ${
      focusRing ? "focus:ring-2 focus:ring-purple-500/50" : ""
    } bg-gray-900 text-gray-100 placeholder-gray-500 w-full ${
      textarea && "resize-none h-32"
    } ${className}`;
    if (textarea) {
      return (
        <textarea ref={ref as any} className={styles} {...(props as any)} />
      );
    } else {
      return <input ref={ref} className={styles} {...props} />;
    }
  }
);

Input.displayName = "Input";
