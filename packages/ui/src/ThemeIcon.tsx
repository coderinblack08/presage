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
      className={`flex items-center justify-center p-1 rounded-lg border shadow text-gray-400 bg-white ${className}`}
    >
      {children}
    </div>
  );
};
