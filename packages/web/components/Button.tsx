import React, {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const sizes = {
  large: "py-2.5 px-7 rounded-lg",
  medium: "py-2 px-6 rounded-lg",
  regular: "px-5 py-2 rounded-lg",
  small: "px-5 py-1.5 rounded-lg",
  none: "rounded-md",
};

const iconSizes = {
  large: "p-3 rounded-md",
  medium: "p-2.5 rounded-md",
  regular: "p-2 rounded-md",
  small: "p-1.5 rounded-md",
  none: "rounded-md",
};

const colors = {
  transparent: "bg-transparent",
  primary:
    "text-gray-700 bg-primary hover:bg-primary-light disabled:opacity-50",
  gray:
    "text-white bg-gray-500 hover:bg-gray-400 disabled:text-gray-200 disabled:opacity-50",
  darkGray:
    "text-white bg-gray-600 hover:bg-gray-500 disabled:text-gray-200 disabled:opacity-50",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  icon?: ReactNode;
  transition?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  color = "primary",
  icon,
  loading,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${icon && !children ? iconSizes[size] : sizes[size]} ${
        colors[color]
      } focus:outline-none focus-visible:ring flex items-center justify-center transition ${className}`}
      {...props}
    >
      <span className={`flex items-center ${loading ? "opacity-0" : ""}`}>
        {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
        <p
          className={`font-bold ${
            ["small", "regular"].includes(size) ? "small" : ""
          }`}
        >
          {children}
        </p>
      </span>
      {loading ? (
        <span className="absolute">
          <div
            className={`${
              color === "primary" ? "spinner-dark" : "spinner"
            } absolute inset-x-auto`}
          />
        </span>
      ) : null}
    </button>
  );
};
