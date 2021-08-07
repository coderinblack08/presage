import { Article } from "../entities/Article";
import { redis } from "./redis";

export const getLastOpenedKey = (userId: string) => `last-opened:${userId}`;

export const getLastOpened = async (userId: string) => {
  const key = getLastOpenedKey(userId);
  return JSON.parse((await redis.get(key)) || "[]") as string[];
};

export const removeFromLastOpened = async (
  userId: string,
  article: Article | Article[] | string
) => {
  const key = getLastOpenedKey(userId);
  const lastOpened = await getLastOpened(userId);
  let payload: string[] = lastOpened;
  if (article instanceof Article || typeof article === "string") {
    const id = typeof article === "string" ? article : article.id;
    payload = lastOpened.filter((x) => id !== x);
  }
  if (article instanceof Array) {
    payload = lastOpened.filter(
      (x) => article.find((y) => y.id === x) === undefined
    );
  }
  await redis.set(key, JSON.stringify(payload));
};

export const addToLastOpened = async (userId: string, article: Article) => {
  const key = getLastOpenedKey(userId);
  const lastOpened = await getLastOpened(userId);
  await redis.set(
    key,
    JSON.stringify([article.id, ...lastOpened.filter((x) => x !== article.id)])
  );
};
