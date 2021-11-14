import React from "react";

interface CheckListItemProps {}

export const CheckListItem: React.FC<CheckListItemProps> = ({ children }) => {
  return (
    <li className="flex items-center space-x-2.5 flex-shrink-0">
      <span className="h-6 flex items-center sm:h-7">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-200"
        >
          <rect width="18" height="18" rx="9" fill="currentColor" />
          <path
            d="M4.78125 10.0312L7.40625 12.6562L13.9688 6.09375"
            className="text-gray-500"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </span>
      <span className="text-gray-600">{children}</span>
    </li>
  );
};
