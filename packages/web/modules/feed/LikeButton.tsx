import React from "react";
import { MdThumbUp } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { mutator } from "../../lib/mutator";
import { Presage } from "../../types";

interface LikeButtonProps {
  presage: Presage;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ presage }) => {
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();

  return (
    <button
      className={`flex items-center space-x-3 focus:outline-none ${
        presage.liked ? "text-primary" : ""
      }`}
      onClick={async () => {
        await mutateAsync(["/api/presage/like", { id: presage.id }, "POST"], {
          onSuccess: () => {
            const newData = (data: Presage) => ({
              ...data,
              liked: !presage.liked,
              likes: data.likes + (presage.liked ? -1 : 1),
            });

            queryClient.setQueryData<Presage[]>("/api/presage", (old) => {
              const index = old.findIndex((x) => x.id === presage.id);
              old[index] = newData(old[index]);
              return old;
            });

            queryClient.setQueryData<Presage>(
              `/api/presage/${presage.id}`,
              (old) => newData(old)
            );
          },
        });
      }}
    >
      <MdThumbUp className="w-6 h-6" />
      <span>{presage.likes}</span>
    </button>
  );
};
