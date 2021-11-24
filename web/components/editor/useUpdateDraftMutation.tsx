import { doc, updateDoc } from "@firebase/firestore";
import { JSONContent } from "@tiptap/react";
import { useMutation } from "react-query";
import { firebase } from "../../lib/firebase";

export const useUpdateDraftMutation = () => {
  return useMutation(
    async ({
      id,
      values,
    }: {
      id: string;
      values: { title: string; editorJSON: JSONContent | null };
    }) => {
      console.log(id);

      await updateDoc(doc(firebase.db, "articles", id), values);
    }
  );
};
