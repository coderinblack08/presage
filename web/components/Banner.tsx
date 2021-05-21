import React from "react";

interface BannerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const Banner: React.FC<BannerProps> = ({ className, ...props }) => {
  return (
    <div>
      <div
        className={`bg-gradient-to-b from-transparent to-[#1B202E66] pb-8 ${className}`}
        {...props}
      />
      <div className="h-[1px] w-full bg-gradient-to-r from-darker-gray via-[#404963] to-darker-gray opacity-50" />
    </div>
  );
};
