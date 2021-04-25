import { VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid";
import Prismic from "@prismicio/client";
import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import useSound from "use-sound";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/pish/Card";
import { client } from "../lib/prismic";

const Pish: NextPage<{ articles?: ApiSearchResponse }> = ({ articles }) => {
  const [play, { stop, isPlaying }] = useSound("/assets/pronounce_pish.mp3");

  return (
    <div>
      <Head>
        <title>Pish News</title>
        <meta
          name="description"
          content="An innovative student run non-mainstream news organization delivery credible news biweekly."
        />
      </Head>
      <Navbar />
      <main className="max-w-6xl mx-auto py-20 lg:py-24 px-6">
        <div className="relative">
          <div className="absolute left-0 bottom-1/2 top-1/2 flex items-center space-x-4">
            <h3>
              <span className="h3 text-faint-primary">Pish</span> & Presage
            </h3>
            <button onClick={isPlaying ? () => stop() : () => play()}>
              {isPlaying ? (
                <VolumeOffIcon className="w-8 h-8" />
              ) : (
                <VolumeUpIcon className="w-8 h-8" />
              )}
            </button>
          </div>
          <h1 className="text-6xl xl:text-7xl font-black text-black select-none stroke-text">
            Pish & Presage
          </h1>
        </div>
        <p className="text-light-gray text-[15px] mt-6">
          <span className="text-faint-primary">Exclamation.</span> used to
          express annoyance, impatience, or disgust.
        </p>
        <p className="text-gray mt-2">
          Merging Pish, an innovative student run non-mainstream news
          organization, with Presage.
        </p>
        <div className="container lg:w-full grid mt-16 grid-cols-12 gap-12 lg:gap-4">
          {articles.results[0].data.items.map(({ article }, index: number) => (
            <div
              className={`col-span-12 lg:col-span-6 ${
                index === 0 ? "row-span-4" : "row-span-1"
              }`}
            >
              <Card
                slug={article.slug}
                tags={article.tags}
                date={new Date(article.data.date)}
                title={article.data.title[0].text}
                description={article.data.description}
                author={article.data.author.data.fullname[0].text}
                image={article.data.image}
                expanded={index === 0}
              />
            </div>
          ))}
          <a
            className="col-span-12 lg:col-span-6 row-span-1 text-primary hover:text-faint-primary"
            href=""
          >
            View All →
          </a>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = await client.query(
    Prismic.Predicates.at("document.type", "trending"),
    {
      fetchLinks: [
        "articles.title",
        "articles.description",
        "articles.image",
        "articles.author",
        "articles.date",
        "authors.fullname",
      ],
    }
  );

  return {
    props: {
      articles,
    },
  };
};

export default Pish;
