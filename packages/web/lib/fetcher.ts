import { QueryFunctionContext } from "react-query";
import { API_URL } from "./constants";

const isJSON = (input: string) => {
  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }
  return true;
};

export const fetcher = async <T = any>(
  context: QueryFunctionContext<any>,
  jid: string | null = null
): Promise<T | null> => {
  if (!context.queryKey[0]) {
    return null;
  }
  let request: Response;
  if (typeof window === "undefined") {
    request = await fetch(`${API_URL}/v1` + context.queryKey, {
      headers: {
        cookie: `jid=${jid}`,
      },
      credentials: "include",
    });
  } else {
    request = await fetch(`${API_URL}/v1` + context.queryKey, {
      credentials: "include",
    });
  }

  if (!request.ok) {
    throw new Error(await request.json());
  }

  const resText = await request.text();
  if (isJSON(resText)) {
    return JSON.parse(resText);
  }

  if (resText) {
    return resText as any;
  } else {
    return null;
  }
};

export const ssrFetcher = (jid: string) => (
  context: QueryFunctionContext<any>
) => fetcher(context, jid);
