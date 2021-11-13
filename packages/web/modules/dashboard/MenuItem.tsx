import { IconSelector } from "@tabler/icons";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";

interface MenuItemProps {
  link: {
    name: string;
    icon: JSX.Element;
    href: string;
  };
}

export const MenuItem: React.FC<MenuItemProps> = ({ link }) => {
  const router = useRouter();
  const isFocused = router.pathname === link.href;

  return (
    <Link href={link.href} passHref>
      <a
        className={`flex items-center justify-between px-4 py-2 w-full rounded-xl ${
          isFocused ? "bg-gray-800" : ""
        }`}
      >
        <div
          className={`flex items-center space-x-3 w-full ${
            isFocused ? "text-gray-100" : "text-gray-500"
          }`}
        >
          {link.icon}
          <span className="capitalize">{link.name}</span>
        </div>
        {link.name === "Home" && (
          <IconSelector size={20} className="text-gray-500" />
        )}
      </a>
    </Link>
  );
};
