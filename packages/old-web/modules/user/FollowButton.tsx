import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { User } from "../../lib/types";

interface FollowButtonProps {
  username: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ username }) => {
  const { data: user } = useQuery<User>(`/user/${username}`);
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();
  const fn = async (follow: boolean) => {
    await mutateAsync([`/follow/${user?.id}`, {}, "post"], {
      onSuccess: () => {
        queryClient.setQueryData<User>(
          `/user/${username}`,
          (old) =>
            (old
              ? {
                  ...old,
                  isFollowing: follow,
                  followersCount: old?.followersCount + (follow ? 1 : -1),
                }
              : null) as User
        );
        const me = queryClient.getQueryData<User>("/me");
        if (me) {
          queryClient.setQueryData<User>(
            `/user/${me.username}`,
            (old) =>
              (old
                ? {
                    ...old,
                    followingCount: old?.followingCount + (follow ? 1 : -1),
                  }
                : null) as User
          );
        }
      },
    });
  };

  return (
    <>
      {user?.isFollowing ? (
        <Button size="small" onClick={() => fn(false)} rounded>
          Unfollow
        </Button>
      ) : (
        <Button
          size="small"
          icon={<MdPersonAdd className="w-5 h-5" />}
          onClick={() => fn(true)}
          rounded
        >
          Follow
        </Button>
      )}
    </>
  );
};
