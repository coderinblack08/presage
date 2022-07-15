import React from "react";

interface ListCheckProps {}

export const ListCheck: React.FC<ListCheckProps> = ({}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="18" rx="9" fill="url(#paint0_linear)" />
      <path
        d="M4.78125 10.0312L7.40625 12.6562L13.9688 6.09375"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="9"
          y1="0"
          x2="9"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEFEFF" />
          <stop offset="1" stopColor="#DBDEE3" />
        </linearGradient>
      </defs>
    </svg>
  );
};
