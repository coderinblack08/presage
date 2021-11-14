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
    name: "Editor",
    icon: (f: boolean) => <IconSmartHome size={22} stroke={1.5} />,
    href: "/dashboard",
  },
  {
    name: "Explore",
    icon: (f: boolean) => <IconBrandSafari size={22} stroke={1.5} />,
    href: "/explore",
  },
  {
    name: "Subscriptions",
    icon: (f: boolean) => <IconArchive size={22} stroke={1.5} />,
    href: "/subscriptions",
  },
  {
    name: "Rewards",
    icon: (f: boolean) => <IconTrophy size={22} stroke={1.5} />,
    href: "/rewards",
  },
  {
    name: "Settings",
    icon: (f: boolean) => <IconSettings size={22} stroke={1.5} />,
    href: "/settings",
  },
];

export const MenuLinks: React.FC<MenuLinksProps> = ({}) => {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <MenuItem link={link} key={link.name} />
      ))}
    </ul>
  );
};
