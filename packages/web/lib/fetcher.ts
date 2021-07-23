import { QueryFunctionContext } from "react-query";
import { API_URL } from "./constants";

export const fetcher = async <T = any>(
  context: QueryFunctionContext<any>,
  jid: string | null = null
): Promise<T> => {
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
    throw new Error(await request.text());
  }

  return await request.json();
};

export const ssrFetcher = (jid: string) => (
  context: QueryFunctionContext<any>
) => fetcher(context, jid);
