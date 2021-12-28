import {
  IconArchive,
  IconBrandSafari,
  IconSettings,
  IconSmartHome,
  IconTrophy,
} from "@tabler/icons";
import React from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";

interface SidebarMenuLinksProps {}

const links = [
  {
    icon: <IconSmartHome className="text-gray-400" strokeWidth={1.5} />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <IconBrandSafari className="text-gray-400" strokeWidth={1.5} />,
    label: "Explore",
    href: "/explore",
  },
  {
    icon: <IconTrophy className="text-gray-400" strokeWidth={1.5} />,
    label: "Rewards",
    href: "/rewards",
  },
  {
    icon: <IconArchive className="text-gray-400" strokeWidth={1.5} />,
    label: "Subscriptions",
    href: "/subscriptions",
  },
  {
    icon: <IconSettings className="text-gray-400" strokeWidth={1.5} />,
    label: "Settings",
    href: "/settings",
  },
];

export const SidebarMenuLinks: React.FC<SidebarMenuLinksProps> = ({}) => {
  return (
    <ul className="py-4 space-y-2 border-b px-3">
      {links.map((link) => (
        <SidebarMenuItem key={link.label} {...link} />
      ))}
    </ul>
  );
};
