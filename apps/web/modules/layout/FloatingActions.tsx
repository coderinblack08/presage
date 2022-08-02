import { IconSun, IconMoon } from "@tabler/icons";
import { useKBar } from "kbar";
import React from "react";
import { useSSRTheme } from "../../lib/useSSRTheme";

interface FloatingActionsProps {}

export const FloatingActions: React.FC<FloatingActionsProps> = ({}) => {
  const theme = useSSRTheme();
  const { query } = useKBar();

  return (
    <div className="fixed z-50 bg-white dark:bg-gray-900 dark:border-gray-800 bottom-3 right-3 border rounded-xl shadow-lg">
      <div className="divide-x flex items-center text-gray-400 dark:divide-gray-800">
        <button
          className="px-3 py-2 flex items-center"
          onClick={() =>
            theme?.setTheme(theme.theme === "dark" ? "light" : "dark")
          }
        >
          <span className="font-semibold mr-3 text-[13px]">Theme</span>
          <div className="border dark:border-gray-800 rounded-lg shadow-sm p-1">
            {theme?.theme === "dark" ? (
              <IconSun size={12} />
            ) : (
              <IconMoon size={12} />
            )}
          </div>
        </button>
        <button onClick={query.toggle} className="px-3 py-2">
          <span className="font-semibold mr-3 text-[13px]">Actions</span>
          <kbd className="mr-1.5">⌘</kbd>
          <kbd>K</kbd>
        </button>
      </div>
    </div>
  );
};
