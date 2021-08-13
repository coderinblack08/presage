import React from "react";

interface ButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
