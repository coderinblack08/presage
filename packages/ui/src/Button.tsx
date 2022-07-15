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
    blue: {
      filled: "bg-blue-500 hover:bg-blue-400 text-white",
      outline: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500",
    },
    primary: {
      filled: "bg-gray-800 hover:bg-gray-700 text-gray-100",
      outline: "bg-white text-gray-900 border shadow-sm",
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
  icon?: React.ReactNode;
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
      icon,
      onClick,
      ...props
    },
    ref
  ) => {
    function createRipple(
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
      const button = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      const topPos = button.getBoundingClientRect().top + window.scrollY;
      const leftPos = button.getBoundingClientRect().left + window.scrollX;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - (leftPos + radius)}px`;
      circle.style.top = `${event.clientY - (topPos + radius)}px`;
      if (variant === "outline") {
        circle.classList.add("ripple", "!bg-gray-900/10");
      } else {
        circle.classList.add("ripple");
      }

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }

    return (
      <button
        ref={ref}
        onClick={(e) => {
          createRipple(e);
          onClick && onClick(e);
        }}
        disabled={disabled || loading}
        className={`relative overflow-hidden flex items-center transition justify-center font-bold select-none focus:outline-none ${
          (disabled || loading) && "opacity-50 cursor-not-allowed"
        } ${variants.size[size]} ${
          variants.color[color][variant]
        } ${className}`}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
