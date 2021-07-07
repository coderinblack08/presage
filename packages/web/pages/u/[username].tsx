import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdLink, MdLocationOn } from "react-icons/md";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";
import { User } from "../../lib/types";
import { ArticleCard } from "../../modules/article/ArticleCard";
import { FilledArticleCard } from "../../modules/article/FilledArticleCard";

const UserPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { data: user, isFetching } = useQuery<User>(`/user/${username}`);

  return (
    <Layout>
      {!user || isFetching ? (
        <div className="spinner" />
      ) : (
        <div className="grid grid-cols-[2.6fr,6fr,2.6fr] gap-x-10">
          <NextSeo title={`${user.displayName} - @${user.username}`} />
          <aside>
            <img
              src={user?.profilePicture}
              alt={user?.displayName}
              className="w-36 h-36 rounded-full"
            />
            <div className="my-8">
              <h4>{user?.displayName}</h4>
              <p className="text-primary">@{user?.username}</p>
              <p className="mt-3 text-gray-200">
                middle-school developer at day, meme dealer at night; founder at
                presage
              </p>
            </div>
            <div className="flex items-center space-x-4 mb-5">
              <p className="text-gray-300">
                <span className="text-gray-100 font-bold">48.2k</span> Followers
              </p>
              <p className="text-gray-300">
                <span className="text-gray-100 font-bold">1.2k</span> Following
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MdLink className="w-5 h-5" />
                <a href="#" className="text-gray-200">
                  coderinblack.now.sh
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <AiOutlineTwitter className="w-5 h-5" />
                <a href="#" className="text-gray-200">
                  @coderinblack
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MdLocationOn className="w-5 h-5" />
                <span className="text-gray-200">Silicon Valley</span>
              </div>
            </div>
          </aside>
          <main className="w-full">
            <section className="space-y-5">
              {user.articles?.map((article) => (
                <FilledArticleCard
                  article={{ ...article, user }}
                  key={article.id}
                />
              ))}
            </section>
          </main>
          <aside>
            <h4 className="text-base">Recent Activity</h4>
            <p className="text-gray-300 mt-2">No Activity Found</p>
          </aside>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { username: context.query.username },
  };
};

export default UserPage;
