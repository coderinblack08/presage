import { useRouter } from "next/router";
import React from "react";

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  label,
  href,
}) => {
  const { pathname } = useRouter();

  return (
    <li>
      <a
        href={href}
        className={`flex items-center space-x-3 py-2 px-4 rounded-xl ${
          pathname === href ? "bg-[#EEEEEE]" : ""
        }`}
      >
        {icon}
        <p className="text-gray-500">{label}</p>
      </a>
    </li>
  );
};
