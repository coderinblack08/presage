import { Transition } from "@headlessui/react";
import { createPortal } from "react-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { BlogJsonLd, NextSeo } from "next-seo";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { Portal } from "react-portal";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ArticleNavbar } from "../../components/ArticleNavbar";
import { Button } from "../../components/Button";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article, User } from "../../lib/types";
import { ActionBar } from "../../modules/article/ActionBar";
import { ClaimReward } from "../../modules/article/ClaimReward";
import { CommentSection } from "../../modules/article/CommentSection";
import { Tags } from "../../modules/article/Tags";
import { extensions } from "../../modules/draft/TipTapEditor";
import { ClientOnlyPortal } from "../../components/ClientOnlyPortal";

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
  const { data: me } = useQuery<User>("/me");
  const seo = {
    url: `https://joinpresage.com/article/${article.id}`,
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

  useEffect(() => {
    if (referred && !me) {
      toast.custom(
        (t) => (
          <Transition
            as={Fragment}
            show={t.visible}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white p-6 shadow-xl rounded-xl max-w-md">
              <button
                className="absolute top-4 right-4 focus:outline-none"
                onClick={() => toast.dismiss(t.id)}
              >
                <MdClose className="text-gray-500 w-4 h-4" />
              </button>
              <h4 className="text-xl">Login to Claim </h4>
              <p className="text-gray-600 mt-1">
                It seems you&apos;ve been referred to this article. Login to
                help the referrer claim rewards. Enjoy the article!
              </p>
            </div>
          </Transition>
        ),
        { position: "bottom-left", duration: 8000 }
      );
    }
  }, [referred, me]);

  return (
    <>
      <ClientOnlyPortal selector="#__next">
        <div className="relative z-10">
          <Toaster toastOptions={{ style: { zIndex: 0 } }} />
        </div>
      </ClientOnlyPortal>
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
            authors: [`https://joinpresage.com/u/${article.user.username}`],
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
          <div className="max-w-4xl mx-auto px-5 md:px-8 pt-6 md:pt-10 pb-10 md:pb-16">
            <Link href={`/u/${article.user.username}`}>
              <a className="inline-flex items-center space-x-5 mb-8">
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
            <div className="text-gray-600 py-1 overflow-y-auto whitespace-nowrap">
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
          <div className="py-8 sm:py-12 md:py-16 overflow-y-auto">
            {article.shoutouts.length > 0 ? (
              <div className="pb-10 mb-10 border-b">
                <div className="flex items-center space-x-3">
                  <h6 className="text-lg font-bold">Shoutouts</h6>
                  <ClaimReward
                    user={article.user}
                    opener={(setIsOpen) => (
                      <Button
                        size="small"
                        color="white"
                        rounded
                        onClick={() => setIsOpen(true)}
                      >
                        Claim
                      </Button>
                    )}
                  />
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Thanks for helping grow this community!
                </p>
                <div className="flex items-center space-x-8 mt-5">
                  {article.shoutouts.map((shoutout) => (
                    <Link
                      key={shoutout.id}
                      href={`/u/${shoutout.user.username}`}
                    >
                      <a className="flex items-center space-x-3">
                        <img
                          src={shoutout.user.profilePicture}
                          alt={shoutout.user.displayName}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-gray-700 font-bold">
                          {shoutout.user.displayName}
                        </span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <article
              className="prose w-full max-w-full overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </div>
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
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));

  return {
    props: {
      id,
      referred,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArticlePage;
