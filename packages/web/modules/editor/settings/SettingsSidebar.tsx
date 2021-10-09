import { deleteDoc, doc, getFirestore } from "@firebase/firestore";
import { IconCameraPlus, IconTrash } from "@tabler/icons";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { mutate } from "swr";
import { Button } from "../../../components/button";
import { InputField, TextareaField } from "../../../components/input";
import { Article } from "../../../types";

interface SettingsSidebarProps {
  draft: Article;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ draft }) => {
  const router = useRouter();

  return (
    <aside className="p-6 h-screen w-full max-w-sm border-l bg-white space-y-8 overflow-y-auto">
      <InputField
        name="canonical"
        label="Canonical Link"
        description="Link the original publishing link. Presage sets this URL as it’s canonical meta tag."
        placeholder="Enter your canonical..."
        className="w-full"
        outline
      />
      <InputField
        name="tags"
        label="Tags"
        description="Enter comma separated tags (up to five and without hashtags)"
        placeholder="star wars, movies, review"
        className="w-full"
        outline
      />
      <TextareaField
        label="Description"
        name="description"
        placeholder="Enter your description..."
        className="w-full"
        outline
      />
      <div>
        <label className="font-bold mb-2 block">Cover Image</label>
        <Button
          icon={<IconCameraPlus className="text-gray-600" size={20} />}
          outline
        >
          <span className="text-gray-600 font-semibold">Insert Cover</span>
        </Button>
      </div>
      <div>
        <label className="font-bold mb-2 block">Actions</label>
        <Button
          onClick={async () => {
            try {
              const confirmed = window.confirm(
                "Are you sure you want to delete this article?"
              );
              if (confirmed) {
                await deleteDoc(doc(getFirestore(), "articles", draft.id));
                mutate(
                  `/api/journals/drafts?journalId=${draft.journalId}`,
                  (old: Article[]) =>
                    (old || []).filter((x) => x.id !== draft.id)
                );
                router.push("/dashboard");
              }
            } catch {}
          }}
          icon={<IconTrash className="text-gray-600" size={20} />}
          outline
        >
          <span className="text-gray-600 font-semibold">Delete</span>
        </Button>
      </div>
    </aside>
  );
};
