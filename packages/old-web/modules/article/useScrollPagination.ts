import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { fetcher } from "../../lib/fetcher";
import { PaginatedResponse } from "../../lib/types";

type QueryParams = Record<string, string | null>;

export const useScrollPagination = <T = any>(
  queryKey: string,
  queryParams: QueryParams = {},
  LIMIT: number = 10
) => {
  const key = useCallback(
    (more: QueryParams = {}) => {
      const dict: QueryParams = {
        limit: LIMIT.toString(),
        ...queryParams,
        ...more,
      };
      return `${queryKey}?${Object.keys(dict)
        .filter((x) => dict[x] !== null)
        .map((x) => `${x}=${dict[x]}`)
        .join("&")}`;
    },
    [LIMIT, queryKey, queryParams]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedResponse<T>>(
    key(),
    async (context) => {
      return (await fetcher({
        queryKey: key({ skip: context.pageParam || null }),
      })) as PaginatedResponse<T>;
    },
    {
      getNextPageParam: (curr, pages) => {
        if (curr.hasMore) {
          return pages.length * LIMIT;
        }
        return undefined;
      },
      keepPreviousData: true,
    }
  );
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    inView,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
    data,
  ]);

  return {
    ref,
    inView,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
