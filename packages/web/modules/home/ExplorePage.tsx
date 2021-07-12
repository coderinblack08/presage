import React from "react";
import { Search } from "react-iconly";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Article } from "../../lib/types";
import { ArticleCard } from "../article/ArticleCard";

interface ExplorePageProps {}

export const ExplorePage: React.FC<ExplorePageProps> = ({}) => {
  const { data: articles } = useQuery<Article[]>("/articles/explore");

  return (
    <div className="py-5 md:py-8">
      <h4>Your Curated Feed</h4>
      <p className="text-gray-600 mt-1">
        Did you know? — Select your favorite tags to add them as filters
      </p>
      <div className="flex items-center mt-8">
        <button className="mr-5 text-gray-800">
          <Search size="small" stroke="bold" />
        </button>
        <div className="h-5 border-r border-gray-300" />
        <nav className="flex space-x-1.5 items-center ml-5">
          <Button color="white" size="small">
            <span className="font-bold">Recommended</span>
          </Button>
          <Button color="transparent" size="small">
            <span className="text-gray-600">Recent</span>
          </Button>
          <Button color="transparent" size="small">
            <span className="text-gray-600">Liked</span>
          </Button>
          <Button color="transparent" size="small">
            <span className="text-gray-600">Replied</span>
          </Button>
        </nav>
      </div>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </main>
    </div>
  );
};
