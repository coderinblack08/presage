import React from "react";

interface BannerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const Banner: React.FC<BannerProps> = ({ className, ...props }) => {
  return (
    <div
      className={`bg-gradient-to-b from-transparent to-[#1B202E66] pb-8 border-b border-darker-gray border-opacity-75 ${className}`}
      {...props}
    />
  );
};
