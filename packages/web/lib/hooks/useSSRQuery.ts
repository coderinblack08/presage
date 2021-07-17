import { QueryKey, useQuery, UseQueryResult } from "react-query";
import { Article } from "../types";

export const useSSRQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey
) => {
  const result = useQuery<Article>(queryKey) as UseQueryResult<
    Article,
    unknown
  > & { data: Article };
  return result;
};
