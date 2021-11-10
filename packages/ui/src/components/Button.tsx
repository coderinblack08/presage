import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";

const variants = {
  size: {
    sm: "py-1.5 px-5 rounded-lg text-base",
    md: "py-2 px-6 rounded-lg text-base",
    lg: "py-2 px-7 rounded-lg text-lg",
  },
  color: {
    primary: {
      filled: "bg-purple-500 hover:bg-purple-400 text-white",
      outline: "bg-purple-500/20 text-purple-500",
    },
    secondary: {
      filled: "bg-gray-800 hover:bg-gray-700 text-gray-100",
      outline: "bg-transparent border-2 border-white/10 hover:border-white/20",
    },
  },
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof variants["size"];
  variant?: "filled" | "outline";
  color?: keyof typeof variants["color"];
  loading?: boolean;
  ref?: any;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      color = "primary",
      variant = "filled",
      disabled,
      loading,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`flex items-center transition justify-center font-bold select-none focus:outline-none ${
          (disabled || loading) && "opacity-50 cursor-not-allowed"
        } ${variants.size[size]} ${
          variants.color[color][variant]
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
