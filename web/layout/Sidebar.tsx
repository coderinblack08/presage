import { CloudUploadIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { AvatarGroup } from "../components/AvatarGroup";
import { useOnPath } from "../lib/onPath";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const onPath = useOnPath();
  const active = "block py-1.5 px-4 rounded-lg bg-darker-gray w-full";
  const normal = "block py-1.5 px-4 rounded-lg w-full text-light-gray";

  return (
    <aside className="w-96">
      <nav>
        <p className="font-bold small text-gray mb-3">NAVIGATION</p>
        <ul className="space-y-3">
          <li>
            <Link href="/soundbites">
              <a href="#" className={onPath("/soundbites") ? active : normal}>
                Recommended
              </a>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block py-1.5 px-4 rounded-lg w-full text-light-gray"
            >
              Explore
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-1.5 px-4 rounded-lg w-full text-light-gray"
            >
              Trending
            </a>
          </li>
          <li>
            <Link href="/upload">
              <a
                className={`${
                  onPath("/upload") ? active : normal
                } flex items-center justify-between`}
              >
                Upload
                <CloudUploadIcon
                  className={`w-5 h-5 ${
                    onPath("/upload") ? "text-lighter-gray" : "text-light-gray"
                  }`}
                />
              </a>
            </Link>
          </li>
        </ul>
        <p className="font-bold small text-gray mb-3 mt-16">FOLLOWING</p>
        <ul className="space-y-6">
          <AvatarGroup username="jcornell" displayName="John Cornell" />
          <AvatarGroup username="coderinblack" displayName="Bovine Cattle" />
        </ul>
      </nav>
    </aside>
  );
};
