import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof ButtonVariants["size"];
  colorScheme?: keyof typeof ButtonVariants["color"];
  icon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const ButtonVariants = {
  size: {
    xs: "px-3 py-1 text-sm",
    sm: "px-5 py-1.5",
    md: "px-5 py-2",
    lg: "px-6 py-2 text-lg",
  },
  color: {
    black: "bg-gray-900 text-white",
    white: "bg-white text-gray-900 border",
    purple: "bg-purple-500 text-white",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      size = "md",
      colorScheme = "black",
      className,
      isDisabled,
      isLoading,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={`flex items-center justify-center ${ButtonVariants.size[size]} ${ButtonVariants.color[colorScheme]} rounded-lg font-bold select-none transition-all transform duration-100 ease-in hover:scale-[0.98] active:scale-[0.95] focus:outline-none focus-visible:ring-gray-300 focus-visible:ring ${className}`}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
