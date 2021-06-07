import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Spinner } from "./Spinner";

const ButtonTheme = {
  size: {
    md: "py-2 px-6 rounded-lg",
    sm: "px-5 py-1.5 rounded-lg",
  },
  color: {
    primary:
      "text-white bg-primary hover:bg-faint-primary disabled:text-white-primary disabled:bg-faint-primary",
    gray: "text-white bg-gray-800 hover:bg-gray-700 disabled:text-gray-200",
  },
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof ButtonTheme.size;
  color?: keyof typeof ButtonTheme.color;
  icon?: ReactNode;
  transition?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  color = "primary",
  icon,
  loading,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`${ButtonTheme.size[size]} ${ButtonTheme.color[color]} focus:outline-none focus-visible:ring inline-flex items-center justify-center transition shadow-sm ${className}`}
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
        <p className={`font-bold ${size === "sm" ? "small" : ""}`}>
          {children}
        </p>
      </span>
      {loading ? (
        <span className="absolute">
          <Spinner />
        </span>
      ) : null}
    </button>
  );
};
