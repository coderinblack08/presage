import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { Select } from "../components/Select";
import { Journal } from "../lib/types";
import { DraftList } from "../modules/draft/DraftList";
import { JournalNavbar } from "../modules/draft/JournalNavbar";
import { useNewDraft } from "../modules/draft/useNewDraft";

const Publish: React.FC = () => {
  const { data: journals, isFetching } = useQuery<Journal[]>(
    `/articles/my-journals`
  );
  const router = useRouter();
  const journalId = router.query.journalId as string;
  const newDraft = useNewDraft();

  useEffect(() => {
    if (!isFetching && journals?.length && !journalId) {
      router.push(`/publish?journalId=${journals[0].id}`);
    }
  }, [journals, isFetching, journalId, router]);

  return (
    <Layout className="py-5 md:py-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <h4>My Drafts</h4>
        <div className="flex items-center justify-between mt-4 space-x-4">
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

export default Publish;
