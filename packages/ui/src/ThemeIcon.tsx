import React from "react";

interface ThemeIconProps {
  className?: string;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center p-1 rounded-lg border dark:border-2 shadow text-gray-400 bg-white dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
};
