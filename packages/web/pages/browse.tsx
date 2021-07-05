import { format } from "date-fns";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Bookmark, Paper, Search, User, Voice } from "react-iconly";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Article } from "../lib/types";
import { ArticleCard } from "../modules/article/ArticleCard";

const Browse: React.FC = () => {
  const {
    query: { q },
  } = useRouter();
  const { data: results, isFetching } = useQuery<Article[]>(
    `/articles?query=${q}`
  );

  return (
    <Layout>
      <NextSeo title="Browse" />
      <div className="max-w-4xl mx-auto">
        <header>
          <p className="text-gray-300">Showing results for</p>
          <div className="flex space-x-4 mt-0.5">
            <div className="mt-3">
              <Search set="light" stroke="bold" />
            </div>
            <h3>{q}</h3>
          </div>
          <nav className="flex items-center mt-8 mb-12">
            <button className="flex items-center justify-center focus:outline-none w-full border-b-2 border-primary text-primary pb-4">
              <Paper set="bulk" />
              <span className="ml-2.5 font-bold">Articles</span>
            </button>
            <button className="flex items-center justify-center text-gray-300 focus:outline-none w-full border-b-2 border-gray-600 pb-4">
              <Voice set="bulk" />
              <span className="ml-2.5">Podcasts</span>
            </button>
            <button className="flex items-center justify-center text-gray-300 focus:outline-none w-full border-b-2 border-gray-600 pb-4">
              <User set="bulk" />
              <span className="ml-2.5">People</span>
            </button>
            <button className="flex items-center justify-center text-gray-300 focus:outline-none w-full border-b-2 border-gray-600 pb-4">
              <Bookmark set="bulk" />
              <span className="ml-2.5">Tags</span>
            </button>
          </nav>
        </header>
        <main>
          {isFetching ? (
            <div className="spinner" />
          ) : results?.length ? (
            results?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="text-gray-400 text-lg">
              No results found for &ldquo;{q}&rdquo;
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Browse;
