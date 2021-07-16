import React, {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const sizes = {
  large: "py-2.5 px-7 rounded-lg",
  medium: "py-2 px-7 rounded-lg",
  regular: "px-6 py-1.5 rounded-lg",
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
    "text-gray-100 bg-gradient-to-b from-gray-600 to-gray-900 disabled:opacity-50",
  white: "text-gray-800 bg-white shadow disabled:opacity-50",
  gray: "text-gray-800 bg-gray-100 disabled:opacity-50",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  icon?: ReactNode;
  transition?: boolean;
  rounded?: boolean;
  loading?: boolean;
  noAnimate?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  color = "primary",
  icon,
  loading,
  rounded,
  className,
  children,
  disabled,
  noAnimate,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${icon && !children ? iconSizes[size] : sizes[size]} ${
        colors[color]
      } focus:outline-none focus-visible:ring flex items-center justify-center transition ${
        rounded ? "!rounded-full" : ""
      } ${
        !noAnimate && !disabled
          ? `hover:-translate-y-0.5  ${
              color === "transparent" ? "" : "hover:shadow-md"
            }`
          : ""
      } ${className}`}
      {...props}
    >
      <span className={`flex items-center ${loading ? "opacity-0" : ""}`}>
        {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
        <div
          className={`inline font-bold ${
            ["small"].includes(size) ? "small" : ""
          }`}
        >
          {children}
        </div>
      </span>
      {loading ? (
        <span className="absolute">
          <div
            className={`${
              color === "primary" ? "spinner-light" : "spinner"
            } absolute inset-x-auto`}
          />
        </span>
      ) : null}
    </button>
  );
};
