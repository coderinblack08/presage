import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { RichTextEditor } from "../../editor/RichTextEditor";
import { currentFileAtom } from "../../lib/store";
import { DashboardLayout } from "../../modules/layout/DashboardLayout";

interface EditorPageProps {
  id: string;
}

const EditorPage: React.FC<EditorPageProps> = ({ id }) => {
  useHydrateAtoms([
    [currentFileAtom, { draftId: id, absolutePath: [], stringPath: [] }],
  ] as const);
  const [currentDraft, setCurrentDraft] = useAtom(currentFileAtom);

  useEffect(
    () => setCurrentDraft((prev) => ({ ...prev, draftId: id })),
    [id, setCurrentDraft]
  );

  return (
    <DashboardLayout>
      <main className="max-w-3xl mx-auto px-5 py-5 lg:py-12">
        <input
          type="text"
          className="text-4xl font-semibold tracking-tight placeholder:text-gray-300 focus:outline-none w-full"
          placeholder="Untitled"
        />
        <RichTextEditor />
      </main>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context.query.id },
  };
};

export default EditorPage;
