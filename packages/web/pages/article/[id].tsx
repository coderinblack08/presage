import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { BlogJsonLd, NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect } from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ArticleNavbar } from "../../components/ArticleNavbar";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article } from "../../lib/types";
import { ActionBar } from "../../modules/article/ActionBar";
import { CommentSection } from "../../modules/article/CommentSection";
import { Tags } from "../../modules/article/Tags";
import { extensions } from "../../modules/draft/TipTapEditor";

const RenderArticle: React.FC<{ article: Article }> = ({ article }) => {
  const editor = useEditor({
    extensions,
    content: article.bodyJson,
    //  does prosemirror schema give us a xss vulnerability?
    //  https:github.com/ueberdosis/tiptap/discussions/241
    editorProps: {
      editable: (_) => false,
      attributes: {
        class: "prose focus:outline-none w-full max-w-full",
      },
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, []);

  return <EditorContent editor={editor} />;
};

const ArticlePage: React.FC<{ id: string; referred: boolean }> = ({
  id,
  referred,
}) => {
  const { data: article } = useSSRQuery<Article>(`/articles/${id}`);
  const seo = {
    url: `https:joinpresage.com/article/${article.id}`,
    articles: [
      {
        url: article.user.profilePicture,
        alt: article.user.displayName,
        width: 72,
        height: 72,
      },
      {
        url: article.journal.name,
        alt: article.journal.picture,
        width: 128,
        height: 128,
      },
    ],
  };

  useEffect(() => {
    if (referred) {
      umami.trackEvent(`User referred to article ${article.id}`, "referred");
    }
  }, [article.id, referred]);

  return (
    <>
      <NextSeo
        title={article.title}
        description=""
        canonical={article.canonical || seo.url}
        openGraph={{
          title: article.title,
          url: seo.url,
          type: "article",
          article: {
            publishedTime: article.publishedDate || article.createdAt,
            modifiedTime: article.updatedAt,
            authors: [`https:joinpresage.com/u/${article.user.username}`],
            tags: article.tags.map((tag) => tag.name),
          },
          images: seo.articles,
        }}
      />
      <BlogJsonLd
        url={seo.url}
        title={article.title}
        images={seo.articles.map((x) => x.url)}
        datePublished={article.publishedDate || article.createdAt}
        dateModified={article.updatedAt}
        authorName={article.user.displayName}
        description=""
      />
      <div>
        <ArticleNavbar user={article.user} lightGray />
        <header className="bg-white">
          <div className="max-w-4xl mx-auto px-5 md:px-8 pt-4 md:pt-8 pb-10 md:pb-16">
            <Link href={`/u/${article.user.username}`}>
              <a className="flex items-center space-x-5 mb-8">
                <div className="relative">
                  <img
                    src={article.journal.picture}
                    alt={article.journal.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <img
                    src={article.user.profilePicture}
                    alt={article.user.displayName}
                    className="absolute -bottom-1 -right-1 ring-2 ring-gray-50 w-5 h-5 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-800 leading-none">
                    {article.journal.name}
                  </p>
                  <p className="small text-gray-500 leading-none mt-2">
                    By {article.user.displayName}
                  </p>
                </div>
              </a>
            </Link>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold !leading-normal">
              {article.title}
            </h1>
            <div className="text-gray-600 mt-1">
              {format(
                new Date(article.publishedDate || article.createdAt),
                "MMMM dd, yyyy"
              )}{" "}
              · {article.readingTime}{" "}
              {article.tags.length ? (
                <div className="inline-block">
                  {" "}
                  · <Tags article={article} />
                </div>
              ) : null}
            </div>
            <ActionBar article={article} />
          </div>
        </header>
        <main className="max-w-4xl w-full px-5 md:px-8 mx-auto pb-12 md:pb-20">
          <article
            className="prose w-full max-w-full py-12 md:py-16 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          {/* <RenderArticle article={article} /> */}
          <div>
            <CommentSection article={article} />
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const referred = context.query.referred ? true : false;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    `/articles/${id}`,
    ssrFetcher(context.req.cookies.jid)
  );

  return {
    props: {
      id,
      referred,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArticlePage;
