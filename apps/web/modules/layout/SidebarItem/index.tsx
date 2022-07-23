import {
  IconArchive,
  IconBrandSafari,
  IconSmartHome,
  IconTrophy,
} from "@tabler/icons";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { FocusedArchiveIcon } from "./icons/FocusedArchiveIcon";
import { FocusedExploreIcon } from "./icons/FocusedExploreIcon";
import { FocusedHomeIcon } from "./icons/FocusedHomeIcon";
import { FocusedTrophyIcon } from "./icons/FocusedTrophyIcon";

interface SidebarItemProps {
  name: keyof typeof icons;
}

const icons = {
  dashboard: {
    focused: <FocusedHomeIcon />,
    default: <IconSmartHome stroke={1.5} />,
  },
  explore: {
    focused: <FocusedExploreIcon />,
    default: <IconBrandSafari stroke={1.5} />,
  },
  subscriptions: {
    focused: <FocusedArchiveIcon />,
    default: <IconArchive stroke={1.5} />,
  },
  rewards: {
    focused: <FocusedTrophyIcon />,
    default: <IconTrophy stroke={1.5} />,
  },
};

const routes = {
  dashboard: "/dashboard",
  explore: "/explore",
  subscriptions: "/subscriptions",
  rewards: "/rewards",
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ name }) => {
  const router = useRouter();
  const isFocused = router.pathname === routes[name];

  return (
    <Link href={routes[name]} passHref>
      <a
        className={`block px-4 py-2.5 w-full rounded-xl ${
          isFocused ? "bg-[#EEE]" : ""
        }`}
      >
        <div className="flex items-center space-x-3 w-full text-gray-500">
          {icons[name][isFocused ? "focused" : "default"]}
          <span className="capitalize">{name}</span>
        </div>
      </a>
    </Link>
  );
};
