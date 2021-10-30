import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdClose, MdPersonAdd, MdShare } from "react-icons/md";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Button } from "../../components/button";
import { fetcher } from "../../lib/fetcher";
import { useScreen } from "../../lib/hooks/useScreen";
import { Navbar } from "../../modules/articles/Navbar";
import { Reactions } from "../../modules/articles/Reactions";
import { ProfilePicture } from "../../modules/authentication/ProfilePicture";
import { CommentSection } from "../../modules/comments/CommentSection";
import { ClaimRewards } from "../../modules/rewards/ClaimRewards";
import { Article } from "../../types";

const ArticlePage: NextPage<{ id: string }> = ({ id }) => {
  const { isSmallerThanTablet } = useScreen();
  const { data: article } = useQuery<Article>(`/api/article/${id}`);

  useEffect(() => {
    const hideReferToast = window.localStorage.getItem("hide-refer-toast");
    if (hideReferToast ? hideReferToast !== "true" : true) {
      toast(
        (t) => (
          <div className="py-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                window.localStorage.setItem("hide-refer-toast", "true");
              }}
              className="absolute top-4 right-4"
            >
              <MdClose className="w-5 h-5 text-gray-400" />
            </button>
            <h3 className="font-bold text-xl mb-1">Earn by sharing</h3>
            <p className="text-gray-600 leading-normal mb-4">
              Refer this article to earn points. You can also use the button
              next to the bookmark icon to generate a unique shareable link.
            </p>
            <Button icon={<MdShare />} outline>
              Share
            </Button>
          </div>
        ),
        {
          duration: Infinity,
          position: "bottom-left",
          className: "relative border shadow",
          style: {
            alignItems: "start",
          },
        }
      );
    }
  }, []);

  return (
    <div>
      <Toaster />
      <Navbar />
      <header className="border-b pt-6 sm:pt-10 pb-6">
        <div className="max-w-4xl mx-auto px-5">
          <div>
            <div className="mb-1 flex items-center space-x-2 text-sm sm:text-base text-gray-500">
              <span>August 28, 2021</span>
              <span className="text-gray-300 text-2xl font-bold">·</span>
              <span>2 min read</span>
            </div>
            <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold !leading-relaxed">
              {article?.title}
            </h1>
            {(article?.tags || []).length !== 0 ? (
              <div className="mt-3 sm:mt-4 flex items-center space-x-2 overflow-y-auto">
                {article?.tags.map((tag) => (
                  <a
                    key={tag}
                    className="block flex-shrink-0 px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-semibold text-xs xs:text-sm"
                  >
                    <span className="text-gray-400">#</span>
                    {tag}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-10 sm:mt-16 flex flex-col xs:flex-row xs:items-center xs:justify-between">
            <a className="flex items-center space-x-2 sm:space-x-3.5">
              <ProfilePicture
                className="w-8 h-8 sm:w-10 sm:h-10"
                user={article?.user!}
              />
              <h2 className="text-sm sm:text-base font-bold text-gray-600">
                {article?.user?.displayName}
              </h2>
            </a>
            <div className="flex items-center mt-3 xs:mt-0">
              <ClaimRewards article={article} />
              <Button
                size={isSmallerThanTablet ? "small" : "regular"}
                className="ml-2"
                icon={
                  <MdPersonAdd
                    className={isSmallerThanTablet ? "w-5 h-5" : "w-6 h-6"}
                  />
                }
                outline
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl w-full px-5 pt-8 pb-16 md:py-16 md:pb-20">
        <Reactions article={article} />
        <article
          className="prose max-w-full mt-8 md:mt-10 mb-12 md:mb-14"
          dangerouslySetInnerHTML={{ __html: article?.editorHTML || "" }}
        />
        <CommentSection article={article} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const id = query.id?.toString();
  const queryClient = new QueryClient();
  const fn = fetcher(req.headers.cookie);
  await queryClient.prefetchQuery(`/api/article/${id}`, fn);
  await queryClient.prefetchQuery(`/api/account`, fn);
  await queryClient.prefetchQuery(
    `/api/comments?path=/articles/${id}/comments`,
    fn
  );

  return { props: { id, dehydratedState: dehydrate(queryClient) } };
};

export default ArticlePage;
