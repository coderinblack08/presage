import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";

const variants = {
  size: {
    sm: "py-1.5 px-5 rounded-xl text-base",
    md: "py-2 px-6 rounded-xl text-base",
    lg: "py-2 px-7 rounded-xl text-lg",
  },
  color: {
    primary: {
      filled: "bg-purple-500 hover:bg-purple-400 text-white",
      outline: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-500",
    },
    secondary: {
      filled: "bg-gray-800 hover:bg-gray-700 text-gray-100",
      outline:
        "bg-transparent border-2 border-gray-100/5 hover:border-gray-100/10 focus-visible:border-purple-500",
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
        className={`flex items-center transition justify-center font-bold select-none focus-visible:ring focus-visible:ring-purple-500/50 focus:outline-none ${
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