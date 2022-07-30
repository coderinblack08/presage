import { KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from "kbar";
import React from "react";
import { RenderResults } from "./RenderResults";

interface CommandPalletteProps {}

export const CommandPallette: React.FC<CommandPalletteProps> = ({}) => {
  return (
    <KBarPortal>
      <KBarPositioner className="z-50 bg-gray-900/50">
        <KBarAnimator className="max-w-xl w-full rounded-xl shadow-xl overflow-hidden bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
          <KBarSearch className="rounded-t-xl px-4 py-3 w-full focus:outline-none border-b dark:text-white dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-600" />
          <div className="p-2">
            <RenderResults />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};
