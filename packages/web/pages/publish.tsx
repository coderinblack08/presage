import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { mutator } from "../lib/mutator";
import { Article } from "../lib/types";
import { DraftItem } from "../modules/draft/DraftItem";
import { EmojiIcon } from "../modules/home/EmojiIcon";

const Publish: React.FC = () => {
  const { mutateAsync } = useMutation(mutator);
  const { data: drafts, isFetching } = useQuery<Article[]>("/articles/drafts");
  const queryClient = useQueryClient();
  const router = useRouter();

  const newDraft = async () => {
    await mutateAsync(["/articles", null, "post"], {
      onSuccess: (data: Article) => {
        queryClient.setQueryData<Article[]>("/articles/drafts", (old) => [
          data,
          ...(old || []),
        ]);
        router.push("/draft/[id]", `/draft/${data.id}`);
      },
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <EmojiIcon emoji="✍🏻" />
        <h3>Your Drafts</h3>
        <div className="flex items-center justify-between mt-4">
          <nav className="flex items-center">
            <Button size="small" color="white">
              <span className="font-bold">Drafts (0)</span>
            </Button>
            <Button size="small" color="transparent">
              <span className="text-gray-600">Published (0)</span>
            </Button>
          </nav>
          <div className="flex items-center space-x-2">
            <Button color="white">Import</Button>
            <Button onClick={newDraft}>Create</Button>
          </div>
        </div>
        <main className="mt-3">
          {isFetching || !drafts ? (
            <div className="spinner" />
          ) : drafts.length === 0 ? (
            <div className="text-gray-400 mt-5">
              You have no drafts. Start by{" "}
              <button onClick={newDraft} className="underline text-gray-600">
                Creating one
              </button>
              .
            </div>
          ) : (
            <div className="grid gap-3">
              {drafts.map((draft) => (
                <DraftItem draft={draft} key={draft.id} />
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Publish;
