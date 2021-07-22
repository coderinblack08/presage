import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { ssrFetcher } from "../lib/fetcher";
import { Journal } from "../lib/types";
import { DraftList } from "../modules/draft/DraftList";
import { JournalNavbar } from "../modules/draft/JournalNavbar";
import { useNewDraft } from "../modules/draft/useNewDraft";

const Publish: React.FC = () => {
  const router = useRouter();
  const journalId = router.query.journalId as string;
  const newDraft = useNewDraft();

  return (
    <Layout className="py-5 md:py-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <h4>My Drafts</h4>
        <p className="text-gray-600 mt-1">
          Are you looking to{" "}
          <Link href="/rewards">
            <a className="font-bold text-gray-900 hover:underline">
              edit your rewards
            </a>
          </Link>
          ?
        </p>
        <div className="flex items-center justify-between mt-6 space-x-4">
          {journalId && (
            <JournalNavbar
              currentJournal={journalId}
              updateJournal={(id: string) =>
                router.push(`/publish?journalId=${id}`)
              }
            />
          )}
          <div className="flex items-center space-x-2">
            <Button
              color="white"
              size="regular"
              onClick={() =>
                toast(
                  () => (
                    <p>
                      Imports are coming soon!{" "}
                      <Link href="/" passHref>
                        <a className="font-bold hover:underline">
                          Join our waitlist
                        </a>
                      </Link>{" "}
                      to get updates on the release.
                    </p>
                  ),
                  { icon: "🦄", duration: 4000 }
                )
              }
            >
              Import
            </Button>
            <Button size="regular" onClick={() => newDraft(journalId)}>
              Create
            </Button>
          </div>
        </div>
        {journalId && <DraftList journalId={journalId} />}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "/journals/me",
    ssrFetcher(context.req.cookies.jid)
  );
  const journals = queryClient.getQueryData<Journal[]>("/journals/me");

  if (!context.query.journalId && journals) {
    return {
      redirect: {
        destination: `/publish?journalId=${journals[0].id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Publish;
