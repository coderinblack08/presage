import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Spinner } from "./Spinner";

const ButtonTheme = {
  size: {
    regular: "py-2 px-5 rounded-lg",
    small: "px-4 py-1 rounded-lg",
  },
  color: {
    transparent: "bg-transparent text-white",
    white: "text-primary bg-white-primary hover:bg-white",
    lightPrimary: "text-white bg-faint-primary",
    primary:
      "text-white bg-primary hover:bg-faint-primary disabled:text-white-primary disabled:bg-faint-primary",
    secondary:
      "text-white bg-darker-gray hover:bg-dark-gray disabled:bg-dark-gray disabled:text-light-gray",
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
  size = "regular",
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
        {icon && <span className="mr-2">{icon}</span>}
        <p className={`font-bold ${size === "small" ? "small" : "body"}`}>
          {children}
        </p>
      </span>
      {loading ? (
        <span className="absolute">
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      ) : null}
    </button>
  );
};
