import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

const ButtonTheme = {
  size: {
    regular: "py-2 px-5 rounded-lg",
    small: "px-4 py-1 rounded-lg",
  },
  color: {
    transparent: "bg-transparent text-white",
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
  loading?: boolean;
  icon?: ReactNode;
  transition?: boolean;
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
      className={`${ButtonTheme.size[size]} ${ButtonTheme.color[color]} focus:outline-none inline-flex items-center justify-center transition shadow-lg ${className}`}
      {...props}
    >
      <div className={loading ? "opacity-0" : "flex items-center"}>
        {icon && <span className="mr-2">{icon}</span>}
        <p className={`font-bold ${size === "small" ? "small" : "body"}`}>
          {children}
        </p>
      </div>
    </button>
  );
};
