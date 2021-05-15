import React from "react";
import ReactAvatar from "react-avatar";

interface AvatarProps {
  displayName: string;
  src?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "35px", md: "40px", lg: "45px" };

export const Avatar: React.FC<AvatarProps> = ({
  displayName,
  src,
  className,
  size = "md",
}) => {
  return (
    <div className="flex items-center space-x-4">
      <ReactAvatar
        name={displayName}
        className={`rounded-full ${className}`}
        src={src ?? undefined}
        size={sizes[size]}
      />
    </div>
  );
};
