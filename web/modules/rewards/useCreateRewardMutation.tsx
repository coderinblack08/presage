import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { firebase } from "../../lib/firebase";
import { User } from "../../types";

export const useCreateRewardMutation = () => {
  const queryClient = useQueryClient();
  const { data: me } = useQuery<User>("/api/me");
  return useMutation(
    async (values: any) => {
      let data = { userId: me?.id };
      const secret: Record<string, string> = {};
      if (values.type === "message") {
        const { message, ...rest } = values;
        data = { ...data, ...rest };
        secret.message = message;
      }
      const { id } = await addDoc(collection(firebase.db, "rewards"), data);
      if (values.type === "message") {
        await setDoc(
          doc(firebase.db, "rewards", id, "secret", "message"),
          secret
        );
      }
      return { ...data, id };
    },
    {
      onSuccess: (data) => {},
    }
  );
};
