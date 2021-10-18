import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { Comment as IComment } from "../../types";
import { useUser } from "../authentication/useUser";
import { useMutationEventStore } from "./useMutationEventStore";

export const useCommentMutation = () => {
  const { uid, user } = useUser();
  const queryClient = useQueryClient();
  const addEvent = useMutationEventStore((x) => x.add);
  const mutation = useMutation(
    async ({
      comment,
      commentPath,
    }: {
      comment: string;
      commentPath: string;
    }) => {
      if (comment.trim().length === 0) {
        return;
      }
      const ref = collection(getFirestore(), commentPath);
      const data = {
        userId: uid,
        message: comment,
        replyCount: 0,
        createdAt: serverTimestamp(),
      };
      const { id } = await addDoc(ref, data);
      return { data: { ...data, id }, commentPath };
    },
    {
      onSuccess: ({ data, commentPath }: any) => {
        addEvent(commentPath, {});
        queryClient.setQueryData<IComment[]>(
          `/api/comments?path=${commentPath}`,
          (old) => [{ ...data, user }, ...(old || [])]
        );
        const depth = (commentPath.match(/\/comments/g) || []).length;
        if (depth > 1) {
          queryClient.setQueryData<IComment[]>(
            `/api/comments?path=${commentPath
              .split("/")
              .slice(0, -2)
              .join("/")}`,
            (old) =>
              (old || []).map((comment) => {
                const tmp = commentPath.split("/");
                if (comment.id === tmp[tmp.length - 2]) {
                  return {
                    ...comment,
                    replyCount: comment.replyCount + 1,
                  };
                }
                return comment;
              })
          );
        }
      },
    }
  );
  return mutation;
};
