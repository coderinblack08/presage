import React from "react";
import Link from "next/link";
import {
  EmojiEvents,
  EmojiEventsOutlined,
  ExploreOutlined,
  Home,
  Explore,
  SettingsOutlined,
  Settings,
  HomeOutlined,
} from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";

interface SidebarItemProps {
  name: keyof typeof icons;
}

const icons = {
  learn: {
    focused: <Home fontSize="medium" />,
    default: <HomeOutlined fontSize="medium" />,
  },
  explore: {
    focused: <Explore fontSize="medium" />,
    default: <ExploreOutlined fontSize="medium" />,
  },
  settings: {
    focused: <Settings fontSize="medium" />,
    default: <SettingsOutlined fontSize="medium" />,
  },
  rewards: {
    focused: <EmojiEvents fontSize="medium" />,
    default: <EmojiEventsOutlined fontSize="medium" />,
  },
};

const routes = {
  learn: "/",
  explore: "/explore",
  settings: "/settings",
  rewards: "/rewards",
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ name }) => {
  const router = useRouter();
  const isFocused = router.pathname === routes[name];

  return (
    <Link href={routes[name]} passHref>
      <a className={`block px-8 ${isFocused ? "bg-gray-100" : ""} py-3 w-full`}>
        <div
          className={`flex items-center space-x-3.5 w-full ${
            isFocused ? "text-gray-800" : "text-gray-500"
          }`}
        >
          {icons[name][isFocused ? "focused" : "default"]}
          <span
            className={`capitalize ${
              isFocused ? "font-semibold" : "font-medium text-gray-500"
            }`}
          >
            {name}
          </span>
        </div>
      </a>
    </Link>
  );
};
