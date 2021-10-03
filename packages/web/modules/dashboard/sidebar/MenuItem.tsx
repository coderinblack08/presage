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
        className={`block px-4 py-2 w-full rounded-lg ${
          isFocused ? "bg-[#EEEEEE]" : ""
        }`}
      >
        <div
          className={`flex items-center space-x-3 w-full ${
            isFocused ? "text-gray-700" : "text-gray-500"
          }`}
        >
          {link.icon}
          <span className="capitalize">{link.name}</span>
        </div>
      </a>
    </Link>
  );
};
