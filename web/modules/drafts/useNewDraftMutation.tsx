import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { firebase } from "../../lib/firebase";
import { Article, User } from "../../types";

export const useNewDraftMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: me } = useQuery<User>("/api/me");
  return useMutation(
    async () => {
      const values = {
        title: "Untitled",
        isPublished: false,
        likeCount: 0,
        bookmarkCount: 0,
        shareCount: 0,
        userId: me?.id,
        createdAt: serverTimestamp(),
      };
      const { id } = await addDoc(
        collection(firebase.db, "articles"),
        values as Article
      );
      return { id, title: values.title, createdAt: values.createdAt };
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Article[]>(
          `/api/drafts`,
          (old) => [data, ...(old || [])] as any
        );
        router.push(`/draft/${data.id}`);
      },
    }
  );
};
