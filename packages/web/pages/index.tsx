import React from "react";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Article, User } from "../lib/types";
import { FilledArticleCard } from "../modules/article/FilledArticleCard";
import { LandingPage } from "../modules/home/LandingPage";

const HomePage: React.FC = () => {
  const { data: me } = useQuery<User>("/me");
  const { data: posts } = useQuery<Article[]>("/articles/explore");

  return (
    <Layout>
      {!me ? (
        <LandingPage />
      ) : (
        <>
          <header>
            <h4>Explore Posts</h4>
            <h5 className="text-gray-300 mb-8 mt-1 font-semibold">
              <span className="text-primary font-semibold">Did you know?</span>{" "}
              — Select your favorite tags to add them as filters
            </h5>
            <nav className="flex items-center justify-between border-b border-gray-600 pb-5">
              <div className="flex items-center space-x-12">
                <button className="font-bold">Recommended</button>
                <button className="font-bold text-gray-300">Recent</button>
                <button className="font-bold text-gray-300">Popular</button>
              </div>
              <div className="flex items-center space-x-3">
                <button className="py-1 px-4 rounded-lg bg-gray-100 text-gray-700 font-bold">
                  #react
                </button>
                <button className="py-1 px-4 rounded-lg bg-gray-100 text-gray-700 font-bold">
                  #tiktok
                </button>
                <button className="py-1 px-4 rounded-lg bg-gray-100 text-gray-700 font-bold">
                  #politics
                </button>
                <button className="py-1 px-4 rounded-lg bg-gray-100 text-gray-700 font-bold">
                  #nodejs
                </button>
                <button className="text-gray-300 font-semibold">
                  <MdChevronRight className="w-6 h-6" />
                </button>
              </div>
            </nav>
          </header>
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {posts?.map((article) => (
              <FilledArticleCard article={article} key={article.id} />
            ))}
          </main>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
