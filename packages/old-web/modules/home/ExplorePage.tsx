import React, { useState } from "react";
import { Search } from "react-iconly";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Article } from "../../lib/types";
import { ArticleCard } from "../article/ArticleCard";
import { useScrollPagination } from "../article/useScrollPagination";

interface ExplorePageProps {}

export const ExplorePage: React.FC<ExplorePageProps> = ({}) => {
  const [query, setQuery] = useState("");
  const [actualQuery, setActualQuery] = useState("");
  const { data: articles, isFetching, ref } = useScrollPagination<Article>(
    "/articles",
    {
      query: actualQuery || null,
    }
  );

  return (
    <div className="py-5 md:py-8">
      <h4>Your Curated Feed</h4>
      <p className="text-gray-600 text-sm sm:text-base mt-1">
        Did you know? — Select your favorite tags to add them as filters
      </p>
      <div className="flex flex-col-reverse sm:flex-row sm:items-center mt-6 sm:mt-8">
        <div className="items-center relative mt-3 sm:mt-0 sm:mr-5">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActualQuery(query);
              }
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setActualQuery("");
              }
              setQuery(e.target.value);
            }}
            value={query}
            placeholder="Search"
            className="w-full sm:w-72 pl-12"
          />
          <div className="h-full mx-4 flex items-center pointer-events-none absolute top-0 left-0 text-gray-500">
            <Search size="small" stroke="bold" />
          </div>
        </div>
        <div className="hidden sm:block h-8 border-r border-gray-300" />
        <nav className="flex space-x-1.5 items-center sm:ml-5">
          <Button color="white" size="small">
            <span className="font-bold sm:text-base text-sm">Articles</span>
          </Button>
          <Button color="transparent" size="small">
            <span className="text-gray-600 sm:text-base text-sm">Journals</span>
          </Button>
          <Button color="transparent" size="small">
            <span className="text-gray-600 sm:text-base text-sm">Users</span>
          </Button>
        </nav>
      </div>
      <main className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {articles?.pages?.map((page) =>
            page.data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
        {!isFetching && <div ref={ref} />}
      </main>
    </div>
  );
};
