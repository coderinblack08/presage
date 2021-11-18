import { useMutation } from "react-query";
import { defaultMutationFn } from "../../lib/defaultMutationFn";

export function useCreateJournalMutation() {
  return useMutation(
    async (data: { name: string; description: string; icon: string }) => {
      await defaultMutationFn(["/journals", data, "post"]);
    }
  );
}
