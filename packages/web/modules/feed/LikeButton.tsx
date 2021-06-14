import React from "react";
import { MdThumbUp } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { Presage, TreePresage } from "../../types";

interface LikeButtonProps {
  presage: Presage | TreePresage;
  compact?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ presage, compact }) => {
  const { mutateAsync } = useMutation(mutator);
  const { refetch } = useQuery(`/api/presage/${presage.id}`);
  const queryClient = useQueryClient();

  async function like() {
    await mutateAsync(["/api/presage/like", { id: presage.id }, "post"], {
      onSuccess: () => {
        const newData = (data: Presage) => ({
          ...data,
          liked: !presage.liked,
          points: data.points + (presage.liked ? -1 : 1),
        });

        let key = "/api/presage";
        if (queryClient.getQueryData(key)) {
          queryClient.setQueryData<Presage[]>(key, (old) => {
            const index = old.findIndex((x) => x.id === presage.id);
            old[index] = newData(old[index]);
            return old;
          });
        }

        key = `/api/presage/${presage.id}`;
        if (queryClient.getQueryData(key)) {
          refetch();
        }
      },
    });
  }

  if (compact) {
    return (
      <button
        className={`flex items-center space-x-3 focus:outline-none ${
          presage.liked ? "text-primary" : ""
        }`}
        onClick={like}
      >
        <MdThumbUp className="w-6 h-6" />
        <span>{presage.points}</span>
      </button>
    );
  }

  return (
    <Button
      icon={<MdThumbUp className="w-6 h-6" />}
      color={presage.liked ? "faintPrimary" : "transparent"}
      onClick={like}
      size="sm"
    >
      <span className="font-bold">
        {presage.points} · {presage.liked ? "Unlike" : "Like"}
      </span>
    </Button>
  );
};
