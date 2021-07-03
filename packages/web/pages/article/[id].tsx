import { format } from "date-fns";
import sanitizeHtml from "sanitize-html";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";
import { Article } from "../../lib/types";

const ArticlePage: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data: article, isFetching } = useQuery<Article>(`/articles/${id}`);

  if (!article || isFetching) {
    return <div className="spinner" />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto divide-y divide-gray-600 space-y-12">
        <header>
          <div className="flex items-center space-x-4 mb-2">
            <img
              src={article.user.profilePicture}
              className="w-7 h-7 rounded-full"
              alt={article.user.displayName}
            />
            <p className="font-bold text-xl text-primary">
              {article.user.displayName}
            </p>
          </div>
          <h2 className="break-words mb-2">{article.title}</h2>
          <p className="text-gray-300">
            <div className="inline-flex items-center space-x-2 mr-1">
              {article.tags.map((x) => (
                <p key={x.id} className="text-gray-300 font-semibold">
                  #<span className="text-gray-200 font-semibold">{x.name}</span>
                </p>
              ))}
            </div>
            {article.tags.length === 0 ? "" : " · "}
            {format(new Date(article.createdAt), "MMMM dd")}
            {article.readingTime ? ` · ${article.readingTime} min read` : ""}
          </p>
        </header>
        <main
          className="prose py-12"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.body) }}
        />
      </div>
    </Layout>
  );
};

export default ArticlePage;
