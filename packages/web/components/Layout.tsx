import { useRouter } from "next/router";
import React from "react";
import { Article } from "../lib/types";
import { ArticleNavbar } from "./ArticleNavbar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  className?: string;
  article?: Article;
}

export const Layout: React.FC<LayoutProps> = ({
  article,
  className,
  children,
}) => {
  const { pathname } = useRouter();

  return (
    <div className="min-h-screen">
      {article ? (
        <ArticleNavbar article={article} />
      ) : (
        <Navbar isDraft={pathname === "/draft/[id]"} />
      )}
      <div
        className={`px-5 md:px-8 ${
          article ? "max-w-4xl" : "max-w-8xl"
        } mx-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
