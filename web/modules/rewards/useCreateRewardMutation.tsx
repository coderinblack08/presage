import { useMutation, useQueryClient } from "react-query";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";

export const useCreateRewardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (values: any) => {
      return defaultMutationFn(["/rewards", values, "POST"]);
    },
    {
      onSuccess: (data) => {},
    }
  );
};
