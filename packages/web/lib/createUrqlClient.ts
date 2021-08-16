import { dedupExchange, cacheExchange, fetchExchange } from "@urql/core";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
