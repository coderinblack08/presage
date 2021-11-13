import React from "react";

interface AvatarProps {
  size: "sm" | "md" | "lg";
  name: string;
  src: string;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export const Avatar: React.FC<AvatarProps> = ({ size = "md", name, src }) => {
  return <img src={src} alt={name} className={`${sizes[size]} rounded-full`} />;
};
