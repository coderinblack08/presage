import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { Article } from "../lib/types";
import illustration from "../public/static/landing-page-illustration.png";
import paper from "../public/icons/paper.png";
import { ArticleCard } from "../modules/article/ArticleCard";

const Index: React.FC = () => {
  const { data: trending } = useQuery<Article[]>("/articles/trending");

  return (
    <Layout>
      <header className="flex justify-between items-center space-x-8">
        <div>
          <h1 className="h3 lg:h2">
            A Medium alternative built for <br />
            <span className="text-primary h3 lg:h2">
              referral podcasts and blogs
            </span>
          </h1>
          <p className="text-gray-300 mt-3 lg:mt-5 mb-6 lg:mb-8 text-base lg:text-lg max-w-2xl !leading-8">
            <span className="text-gray-100 text-base lg:text-lg">
              Tree steps —
            </span>{" "}
            write, record, publish about anything. Grow your audience
            exponentially with Presage&apos;s referral system.
          </p>
          <div className="flex items-center space-x-3">
            <a href="https://localhost:4000/auth/google">
              <Button size="large">Start Growing</Button>
            </a>
            <Button size="large" color="gray">
              Refer Friend
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={illustration}
            alt="Person with microphone"
            placeholder="blur"
          />
        </div>
      </header>
      <main className="mt-12">
        <div className="w-12 h-12 p-2.5 mb-5 rounded-xl flex items-center justify-center bg-purple/25">
          <Image src={paper} alt="Paper Icon" />
        </div>
        <h4>Today’s Trending</h4>
        <p className="text-purple">Podcasts and Articles</p>
        <div className="grid grid-cols-3 gap-12 mt-12">
          {trending?.map((article, rank) => (
            <ArticleCard
              ranking={rank + 1}
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Index;
