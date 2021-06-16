import { QueryFunctionContext } from "react-query";

export const fetcher = async <T = any>(
  context: QueryFunctionContext<any>
): Promise<T> => {
  const request = await fetch("http://localhost:4000" + context.queryKey, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });

  if (request.status !== 200) {
    throw new Error(await request.text());
  }

  return await request.json();
};
