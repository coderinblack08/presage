import { useMutation } from "react-query";
import { defaultMutationFn } from "../../lib/defaultMutationFn";

export function useCreateJournalMutation() {
  return useMutation(async (data: any) => {
    await defaultMutationFn(["/journals", data, "post"]);
  });
}
