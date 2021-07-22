import { useQuery, UseQueryResult } from "react-query";

export const useSSRQuery = <ReturnType = any>(queryKey: string) => {
  return useQuery<ReturnType>(queryKey) as UseQueryResult<
    ReturnType,
    unknown
  > & {
    data: ReturnType;
  };
};
