import { Cache, QueryInput } from "@urql/exchange-graphcache";

export const updateCacheQuery = <Result, Query>(
  cache: Cache,
  qi: QueryInput,
  fn: (q: Query) => Query
) => {
  const cached = cache.readQuery<Query>(qi);
  if (cached) {
    cache.updateQuery<Query>(qi, () => fn(cached));
  }
};
