import useSWR from "swr";
import { fetcher } from "../pages/fetcher";

export const useArticles = (query: string) => {
  console.log(query);

  const result = useSWR(
    `/api/articles?${Object.keys(query)
      .filter((x) => query[x] !== undefined)
      .map((x) => x + "=" + query[x])
      .join("&")}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return result;
};
