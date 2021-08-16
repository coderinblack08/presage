import { dedupExchange, cacheExchange, fetchExchange } from "@urql/core";
import { isServer } from "./constants";

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
  };
};
