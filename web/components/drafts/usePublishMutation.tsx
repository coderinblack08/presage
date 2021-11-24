import { doc, updateDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { firebase } from "../../lib/firebase";

export const usePublishMutation = () => {
  return useMutation(async (id: string) => {
    await updateDoc(doc(firebase.db, "articles", id), { isPublished: true });
  });
};
