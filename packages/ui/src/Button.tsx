import type * as Polymorphic from "@radix-ui/react-polymorphic";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";

const variants = {
  size: {
    xs: "py-1 px-4 rounded-lg text-sm",
    sm: "py-2 px-5 rounded-lg text-sm",
    md: "py-2 px-6 rounded-xl text-base",
    lg: "py-2.5 px-7 rounded-xl text-base",
  },
  iconSize: {
    xs: "p-0 rounded-lg",
    sm: "p-1 rounded-lg",
    md: "p-2 rounded-lg",
    lg: "p-3 rounded-lg",
  },
  color: {
    primary: {
      filled:
        "bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-800 text-gray-100 dark:text-gray-300",
      outline:
        "bg-white text-gray-900 border shadow-sm text-gray-500 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:border-2",
      light:
        "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-800",
      ghost:
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 !font-medium",
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
  rippleColor?: string;
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
      rippleColor,
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
      if (rippleColor) {
        circle.classList.add("ripple", rippleColor);
      } else if (variant === "outline") {
        circle.classList.add(
          "ripple",
          "!bg-gray-900/10",
          "dark:!bg-gray-100/10"
        );
      } else if (variant === "filled") {
        circle.classList.add("ripple");
      } else if (variant === "light") {
        circle.classList.add(
          "ripple",
          "!bg-gray-900/20",
          "dark:!bg-gray-100/20"
        );
      } else {
        circle.classList.add(
          "ripple",
          "!bg-gray-900/10",
          "dark:!bg-gray-100/10"
        );
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
        } ${variants[icon && !children ? "iconSize" : "size"][size]} ${
          variants.color[color][variant]
        } ${className}`}
        {...props}
      >
        {icon && (
          <span
            className={!children ? "text-gray-400 dark:text-gray-600" : "mr-2"}
          >
            {icon}
          </span>
        )}
        {children}
      </Comp>
    );
  }
) as PolymorphicBox;

Button.displayName = "Button";
