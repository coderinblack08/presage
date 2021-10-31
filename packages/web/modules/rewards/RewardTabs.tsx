import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface RewardTabsProps {}

export const RewardTabs: React.FC<RewardTabsProps> = ({}) => {
  const { pathname } = useRouter();
  const focusedStyles = "font-bold border-b-2 border-gray-600 pb-3";
  const unfocusedStyles = "text-gray-500 pb-3";
  const getClassNames = (path: string) =>
    pathname === path ? focusedStyles : unfocusedStyles;

  return (
    <nav className="px-5 pt-4 border-b bg-white">
      <div className="flex space-x-8 lg:space-x-12 max-w-5xl mx-auto w-full">
        <Link href="/claimed-rewards">
          <a className={getClassNames("/claimed-rewards")}>Claimed</a>
        </Link>
        <Link href="/rewards">
          <a className={getClassNames("/rewards")}>Created</a>
        </Link>
      </div>
    </nav>
  );
};
