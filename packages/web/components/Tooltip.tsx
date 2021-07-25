import React from "react";
import Tippy from "@tippyjs/react/headless";

interface TooltipProps {
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <Tippy
      render={(attrs) => (
        <div
          tabIndex={-1}
          className="font-semibold relative px-4 py-1.5 rounded-md bg-gradient-to-b from-gray-600 to-gray-900 text-white"
          {...attrs}
        >
          {content}
          <div className="flex justify-center w-full absolute bottom-1.5 left-0 transform -rotate-45 -translate-x-1">
            <div
              data-popper-arrow=""
              className="h-0 w-0 border-[6px] border-gray-900 border-t-transparent border-r-transparent"
            />
          </div>
        </div>
      )}
    >
      <div>{children}</div>
    </Tippy>
  );
};
