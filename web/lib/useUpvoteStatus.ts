import { useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "../stores/auth";
import { supabase } from "./supabase";

export type StatusType = "upvoted" | "unvoted" | "downvoted";

export function useUpvoteStatus(id: string) {
  const { user } = useUser();
  const [status, setStatus] = useState<StatusType>();
  const {
    data: myUpvote,
    mutate,
    isValidating,
  } = useSWR(
    () => (user ? ["upvote", id] : null),
    async () =>
      (
        await supabase
          .from("upvotes")
          .select("*")
          .match({ soundbite_id: id, user_id: user.id })
      ).data[0]
  );

  useEffect(() => {
    if (!isValidating) {
      if (myUpvote?.value === 1) {
        setStatus("upvoted");
      } else if (myUpvote?.value === -1) {
        setStatus("downvoted");
      } else {
        setStatus("unvoted");
      }
    }
  }, [myUpvote, isValidating]);

  return { myUpvote, mutate, status };
}
