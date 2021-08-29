import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

const sizes = {
  large: "py-2.5 px-7 rounded-lg",
  medium: "py-2 px-7 rounded-lg",
  regular: "px-5 py-1.5 rounded-lg",
  small: "px-5 py-1.5 rounded-lg",
  tiny: "px-5 py-1 rounded-lg",
  none: "rounded-md",
};

const iconSizes = {
  large: "p-3 rounded-md",
  medium: "p-2.5 rounded-md",
  regular: "p-2 rounded-md",
  small: "p-1.5 rounded-md",
  tiny: "p-1 rounded-md",
  none: "rounded-md",
};

const colors = {
  transparent: "bg-transparent",
  black: "text-gray-100 bg-gray-900 disabled:opacity-50",
  white: "text-gray-800 bg-white disabled:opacity-50",
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
  outline?: boolean;
  shadow?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "regular",
  color = "white",
  icon,
  shadow = true,
  loading,
  rounded,
  className,
  children,
  disabled,
  outline,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${icon && !children ? iconSizes[size] : sizes[size]} ${
        colors[color]
      } ${
        color === "transparent"
          ? ""
          : "focus:outline-none focus-visible:ring focus-visible:ring-gray-300"
      } flex items-center justify-center transition ${
        rounded ? "!rounded-full" : ""
      } ${
        outline
          ? `border ${
              shadow ? "shadow-sm" : "shadow-none"
            } focus-visible:border-gray-500/50`
          : ""
      } ${
        shadow ? "shadow" : "shadow-none"
      } disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <span className={`flex items-center ${loading ? "opacity-0" : ""}`}>
        {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
        <div
          className={`inline font-bold ${
            ["small"].includes(size) ? "text-sm" : ""
          }`}
        >
          {children}
        </div>
      </span>
      {loading ? (
        <span className="absolute">
          <div
            className={`${
              color === "black" ? "spinner-light" : "spinner"
            } absolute inset-x-auto`}
          />
        </span>
      ) : null}
    </button>
  );
};
