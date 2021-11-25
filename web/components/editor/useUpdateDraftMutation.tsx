import { doc, updateDoc } from "@firebase/firestore";
import { useMutation } from "react-query";
import { commaSeparatedToList } from "../../lib/commaSeparatedToList";
import { firebase } from "../../lib/firebase";

export const useUpdateDraftMutation = () => {
  return useMutation(async ({ id, values }: { id: string; values: any }) => {
    if ("tags" in values) {
      values.tags = commaSeparatedToList(values.tags);
    }
    await updateDoc(doc(firebase.db, "articles", id), values);
  });
};
