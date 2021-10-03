import {
  IconArchive,
  IconBrandSafari,
  IconSettings,
  IconSmartHome,
  IconTrophy,
} from "@tabler/icons";
import React from "react";
import { MenuItem } from "./MenuItem";

interface MenuLinksProps {}

export const links = [
  {
    name: "Learn",
    icon: <IconSmartHome size={22} stroke={1.5} />,
    href: "/dashboard",
  },
  {
    name: "Explore",
    icon: <IconBrandSafari size={22} stroke={1.5} />,
    href: "/explore",
  },
  {
    name: "Subscriptions",
    icon: <IconArchive size={22} stroke={1.5} />,
    href: "/subscriptions",
  },
  {
    name: "Rewards",
    icon: <IconTrophy size={22} stroke={1.5} />,
    href: "/rewards",
  },
  {
    name: "Settings",
    icon: <IconSettings size={22} stroke={1.5} />,
    href: "/settings",
  },
];

export const MenuLinks: React.FC<MenuLinksProps> = ({}) => {
  return (
    <ul className="space-y-1.5">
      {links.map((link) => (
        <MenuItem link={link} key={link.name} />
      ))}
    </ul>
  );
};
