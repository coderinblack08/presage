import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { baseURL } from "./constants";

export const fetcher = (cookies?: any) => async ({
  queryKey,
}: QueryFunctionContext<any>) => {
  const result = await axios.get(`${cookies ? baseURL : ""}${queryKey[0]}`, {
    headers: cookies ? { cookie: cookies } : undefined,
    withCredentials: true,
  });
  if (result.status !== 200) {
    throw new Error(result.data);
  }
  return result.data;
};
