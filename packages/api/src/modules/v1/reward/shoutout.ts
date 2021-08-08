import { getConnection, In } from "typeorm";
import { ClaimedReward } from "../../../entities/ClaimedReward";
import { Shoutout } from "../../../entities/Shoutout";
import { redis } from "../../../lib/redis";

export const getShoutoutKey = (userId: string, creatorId: string) =>
  `shoutout:${creatorId}:${userId}`;

export const pushToShoutoutQueue = async (
  userId: string,
  creatorId: string
) => {
  const key = getShoutoutKey(userId, creatorId);
  const shoutout = await redis.get(key);
  if (shoutout) {
    await redis.incr(key);
  } else {
    await redis.set(key, 1);
  }
};

export const popFromShoutoutQueue = async (
  creatorId: string,
  articleId: string
) => {
  const key = `shoutout:${creatorId}:*`;
  const stream = redis.scanStream({ match: key });
  stream.on("data", async (result) => {
    const userIds: string[] = [];
    for (const key of result) {
      let value: any = await redis.get(key);
      if (value) {
        value = parseInt(value);
        if (value > 0) {
          const userId = key.split(":")[2];
          userIds.push(userId);

          const where = {
            articleId,
            userId,
          };
          const shoutout = await Shoutout.findOne({ where });
          if (!shoutout) {
            await Shoutout.create(where).save();
          }
          await redis.decr(key);
        }
        if (value === 1) {
          await redis.del(key);
        }
      }
    }
    await getConnection()
      .createQueryBuilder()
      .update(ClaimedReward)
      .set({
        status: "successful",
        shoutoutArticle: articleId,
      })
      .where({ userId: In(userIds) })
      .execute();
  });
};
