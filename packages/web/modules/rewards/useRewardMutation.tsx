import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { Reward, RewardType } from "../../types";
import { useUser } from "../authentication/useUser";

interface NewRewardType {
  name: string;
  description: string;
  points: string | number;
  type: RewardType;
  message: string;
  link: string;
  maxShoutouts: string;
}

export const useRewardMutation = () => {
  const { uid } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newReward: NewRewardType): Promise<Reward> => {
      try {
        (Object.keys(newReward) as Array<keyof NewRewardType>).forEach(
          (key) => {
            if (!newReward[key]) {
              delete newReward[key];
            }
          }
        );
        const data = {
          ...newReward,
          userId: uid,
          createdAt: serverTimestamp(),
        };
        const { id } = await addDoc(
          collection(getFirestore(), "rewards"),
          data
        );
        if (newReward.type === RewardType.Message) {
          await setDoc(
            doc(getFirestore(), "rewards", id, "secret", "message"),
            {
              message: newReward.message,
            }
          );
        }
        window.localStorage.removeItem("autosave-reward");
        data.points = parseInt(data.points.toString());
        return { ...data, id } as Reward;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data: Reward) => {
        queryClient.setQueryData<Reward[]>("/api/rewards", (old) => [
          ...(old || []),
          data,
        ]);
      },
    }
  );
  return mutation;
};
