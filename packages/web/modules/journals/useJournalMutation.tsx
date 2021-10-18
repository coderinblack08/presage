import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { Journal } from "../../types";
import { useUser } from "../authentication/useUser";

export const useCreateJournalMutation = () => {
  const { uid } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (values: any) => {
      try {
        const firestore = getFirestore();
        const data = { ...values, userId: uid };
        const { id } = await addDoc(collection(firestore, "journals"), data);
        return { ...data, id };
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Journal[]>("/api/journals", (old) => [
          ...(old || []),
          data,
        ]);
      },
    }
  );
  return mutation;
};
