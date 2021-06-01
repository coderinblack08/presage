import DataLoader from "dataloader";
import { Upvote } from "../entities/Upvote";

export const createUpvoteLoader = () =>
  new DataLoader<{ soundbiteId: string; userId: string }, Upvote | null>(
    async (keys) => {
      const upvotes = await Upvote.findByIds(keys as any);
      const upvoteIdsToUpvote: Record<string, Upvote> = {};
      upvotes.forEach((upvote) => {
        upvoteIdsToUpvote[`${upvote.userId}|${upvote.soundbiteId}`] = upvote;
      });

      return keys.map(
        (key) => upvoteIdsToUpvote[`${key.userId}|${key.soundbiteId}`]
      );
    }
  );
