import type * as Polymorphic from "@radix-ui/react-polymorphic";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  useEffect,
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
      light: "bg-blue-200 hover:bg-blue-300 text-blue-600",
      ghost: "",
    },
    primary: {
      filled: "bg-gray-800 hover:bg-gray-700 text-gray-100",
      outline: "bg-white text-gray-900 border shadow-sm",
      light: "bg-gray-200 text-gray-600 hover:bg-gray-300",
      ghost: "bg-transparent, text-gray-600 !font-medium",
    },
  },
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  disableRipple?: boolean;
  size?: keyof typeof variants["size"];
  variant?: "filled" | "outline" | "light" | "ghost";
  color?: keyof typeof variants["color"];
  loading?: boolean;
  icon?: React.ReactNode;
  ref?: any;
};

type PolymorphicBox = Polymorphic.ForwardRefComponent<"button", ButtonProps>;

export const Button = forwardRef(
  (
    {
      disableRipple = false,
      as: Comp = "button",
      size = "md",
      color = "primary",
      variant = "filled",
      disabled,
      loading,
      children,
      className,
      icon,
      onMouseDown,
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
      } else if (variant === "filled") {
        circle.classList.add("ripple");
      } else if (variant === "light") {
        circle.classList.add("ripple", "!bg-gray-900/20");
      } else {
        circle.classList.add("ripple", "!bg-gray-900/10");
      }

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }

    return (
      <Comp
        ref={ref}
        onMouseDown={(e) => {
          if (!disableRipple) createRipple(e);
          onMouseDown && onMouseDown(e);
        }}
        disabled={disabled || loading}
        className={`relative overflow-hidden flex items-center transition justify-center font-bold select-none focus:outline-none focus-visible:ring focus-visible:ring-gray-300 ${
          (disabled || loading) && "opacity-50 cursor-not-allowed"
        } ${variants.size[size]} ${
          variants.color[color][variant]
        } ${className}`}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Comp>
    );
  }
) as PolymorphicBox;

Button.displayName = "Button";
