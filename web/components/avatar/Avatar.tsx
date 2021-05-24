import React from "react";
import ReactAvatar from "react-avatar";

interface AvatarProps {
  displayName: string;
  src?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | number;
  textSizeRatio?: number;
}

const sizes = { sm: "35px", md: "40px", lg: "45px" };

export const Avatar: React.FC<AvatarProps> = ({
  displayName,
  src,
  className,
  size = "md",
}) => {
  const s = typeof size === "number" ? size + "px" : sizes[size];
  return (
    <>
      {src ? (
        <ReactAvatar
          name={displayName}
          className={`rounded-full ${className}`}
          src={src ?? undefined}
          size={s}
        />
      ) : (
        <img
          width={s}
          height={s}
          className="rounded-full"
          src="/static/avatar.svg"
        />
      )}
    </>
  );
};
