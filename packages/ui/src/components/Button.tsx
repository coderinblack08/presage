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
    purple: {
      filled: "bg-purple-500 hover:bg-purple-400 text-white",
      outline: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-500",
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
      circle.classList.add("ripple");

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
          if (props.onClick) props.onClick(e);
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
