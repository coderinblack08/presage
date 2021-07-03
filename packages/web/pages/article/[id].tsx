import { format } from "date-fns";
import { GetServerSideProps } from "next";
import React from "react";
import { Bookmark, Chat, Heart, TicketStar } from "react-iconly";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Article } from "../../lib/types";
import { sanitizeBody } from "../../modules/article/sanitizeBody";

const ArticlePage: React.FC<{ id: string }> = ({ id }) => {
  const { data: article, isFetching } = useQuery<Article>(`/articles/${id}`);

  return (
    <Layout>
      {!article || isFetching ? (
        <div className="spinner" />
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          <header>
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={article.user.profilePicture}
                className="w-6 h-6 rounded-full"
                alt={article.user.displayName}
              />
              <p className="font-bold text-lg text-primary">
                {article.user.displayName}
              </p>
            </div>
            <h2 className="break-words mb-2">{article.title}</h2>
            <div className="text-gray-300">
              <div className="inline-flex items-center space-x-2 mr-1">
                {article.tags.map((x) => (
                  <p key={x.id} className="text-gray-300 font-semibold">
                    #
                    <span className="text-gray-200 font-semibold">
                      {x.name}
                    </span>
                  </p>
                ))}
              </div>
              {article.tags.length === 0 ? "" : " · "}
              {format(new Date(article.createdAt), "MMMM dd")}
              {article.readingTime ? ` · ${article.readingTime}` : ""}
            </div>
          </header>
          <div className="border-b border-gray-600 w-full" />
          <main
            className="prose pb-12"
            dangerouslySetInnerHTML={{
              __html: sanitizeBody(article.body),
            }}
          />
          <div className="fixed w-full max-w-4xl bottom-0 bg-gray-700 border-t border-gray-600 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button color="gray">Tip Cash</Button>
              <div className="flex items-center space-x-6">
                <Button>Refer to Friend</Button>
                <div className="flex items-center space-x-2">
                  <TicketStar set="bulk" />
                  <p className="text-gray-300">
                    Earn <span className="text-gray-200 font-bold">+1</span>{" "}
                    Reward
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button>
                <Bookmark set="bold" />
              </button>
              <button>
                <Chat set="bold" />
              </button>
              <button>
                <Heart set="bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context.query.id },
  };
};

export default ArticlePage;
