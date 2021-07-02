import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { Bookmark, Paper, Search, User, Voice } from "react-iconly";
import { MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { Article } from "../lib/types";

const Browse: React.FC = () => {
  const {
    query: { q },
  } = useRouter();
  const { data: results, isFetching } = useQuery<Article[]>(
    `/articles?query=${q}`
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header>
          <p className="text-gray-300">Showing results for</p>
          <div className="flex items-center space-x-4 mt-0.5">
            <Search set="light" stroke="bold" />
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
              <article key={article.id} className="space-y-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={article.user.profilePicture}
                    className="w-6 h-6 rounded-full"
                    alt={article.user.displayName}
                  />
                  <p className="font-bold">{article.user.displayName}</p>
                </div>
                <h4>{article.title}</h4>
                <p className="text-gray-300">
                  {format(new Date(article.createdAt), "MMMM dd")}
                  {article.readingTime
                    ? ` · ${article.readingTime} min read`
                    : ""}
                </p>
              </article>
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
