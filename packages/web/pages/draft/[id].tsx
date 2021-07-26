import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ssrFetcher } from "../../lib/fetcher";
import { Article } from "../../lib/types";
import { DraftEditor } from "../../modules/draft/DraftEditor";
import { DraftSidebar } from "../../modules/draft/DraftSidebar";
import { EditTagModal } from "../../modules/draft/EditTagModal";

const DraftPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ draftId }) => {
  const { data: draft } = useQuery<Article>(`/articles/draft/${draftId}`);

  return (
    <div className="flex items-start bg-white">
      <div className="w-full max-w-xs">
        <DraftSidebar />
      </div>
      {draft ? (
        <div className="w-full h-screen overflow-y-scroll bg-white md:px-12">
          <header className="sticky top-0 bg-white flex items-center justify-between py-6 px-8">
            <div className="flex items-center space-x-3">
              <img
                src={draft.journal.picture}
                className="w-6 h-6 rounded-full"
                alt={draft.journal.name}
              />
              <h5 className="font-semibold">
                Drafts <span className="text-gray-400 mx-1">/</span>{" "}
                <span className="text-gray-700 font-medium">{draft.title}</span>
              </h5>
            </div>
            <div className="flex items-center space-x-6">
              <EditTagModal id={draft.id} />
            </div>
          </header>
          <main className="py-6 px-8">
            <DraftEditor id={draft.id} />
          </main>
        </div>
      ) : null}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "/journals/me",
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));
  await queryClient.prefetchQuery(
    "/rewards",
    ssrFetcher(context.req.cookies.jid)
  );
  const draftId = context.query.id?.toString() || "";
  await queryClient.prefetchQuery(
    `/articles/draft/${draftId}`,
    ssrFetcher(context.req.cookies.jid)
  );

  return {
    props: {
      draftId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default DraftPage;
