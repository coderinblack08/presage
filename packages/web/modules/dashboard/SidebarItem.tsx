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
    focused: <Home />,
    default: <HomeOutlined />,
  },
  explore: {
    focused: <Explore />,
    default: <ExploreOutlined />,
  },
  settings: {
    focused: <Settings />,
    default: <SettingsOutlined />,
  },
  rewards: {
    focused: <EmojiEvents />,
    default: <EmojiEventsOutlined />,
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
      <a className={`block px-9 ${isFocused ? "bg-gray-100" : ""} py-3 w-full`}>
        <div
          className={`flex items-center space-x-3 w-full ${
            isFocused ? "text-gray-800" : "text-gray-500"
          }`}
        >
          {icons[name][isFocused ? "focused" : "default"]}
          <span
            className={`capitalize ${
              isFocused ? "font-semibold" : "font-medium"
            }`}
          >
            {name}
          </span>
        </div>
      </a>
    </Link>
  );
};
