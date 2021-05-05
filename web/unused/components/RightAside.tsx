import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import { Avatar } from "../../components/Avatar";
import { useScreen } from "../../lib/useScreen";

interface RightAsideProps {}

export const RightAside: React.FC<RightAsideProps> = ({}) => {
  const screenType = useScreen();

  if (screenType !== "mobile" && screenType !== "fullscreen") {
    return (
      <aside
        className={`space-y-10 ${
          screenType === "tablet" ? "max-w-sm" : "max-w-md"
        }`}
      >
        <div>
          <p className="font-bold mb-2.5">Recommended Follows</p>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2 flex-shrink-0">
              <Avatar
                className="inline-block ring-2 ring-black"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                displayName="John Smith"
                size="sm"
              />
              <Avatar
                className="inline-block ring-2 ring-black"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                displayName="John Smith"
                size="sm"
              />
              <Avatar
                className="inline-block ring-2 ring-black"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                displayName="John Smith"
                size="sm"
              />
            </div>
            <p className="text-light-gray">
              Jack McDade, Honest Abe,{" "}
              <span className="text-gray">and 3 more</span>
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold mb-2.5">Topics Following</p>
          <div className="flex items-center space-x-2">
            <span className="small px-3.5 py-0.5 font-bold rounded-md bg-darker-gray">
              WebDev
            </span>
            <span className="small px-3.5 py-0.5 font-bold rounded-md bg-darker-gray">
              Politics
            </span>
            <span className="small px-3.5 py-0.5 font-bold rounded-md bg-darker-gray">
              Mathematics
            </span>
            <button className="hover:bg-faint-primary bg-primary p-1 rounded-full">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden divide-y divide-darker-gray">
          <header className="py-3.5 px-5 bg-darkest-gray">
            <h4>Trending Hashtags</h4>
          </header>
          <a href="#" className="block bg-[#171B27] px-5 py-3">
            <p className="text-primary font-medium">Politics · 2k posts</p>
            <p className="font-bold text-lg">#joinsession</p>
            <p className="small text-gray truncate">
              President Joe Biden ate a shoe during his joint address
            </p>
          </a>
          <a href="#" className="block bg-[#171B27] px-5 py-3">
            <p className="text-primary font-medium">Politics · 2k posts</p>
            <p className="font-bold text-lg">#joinsession</p>
            <p className="small text-gray truncate">
              President Joe Biden ate a shoe during his joint address
            </p>
          </a>
          <footer className="py-3.5 px-5 bg-darkest-gray">
            <a href="#" className="font-bold">
              Show More →
            </a>
          </footer>
        </div>
      </aside>
    );
  }

  return null;
};
