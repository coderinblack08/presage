import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { baseURL } from "./constants";

export const defaultQueryFn = (cookies?: any) => async ({
  queryKey,
}: QueryFunctionContext<any>) => {
  console.log(`${baseURL}${queryKey[0]}`);
  const result = await axios.get(`${baseURL}${queryKey[0]}`, {
    headers: cookies ? { cookie: cookies } : undefined,
    withCredentials: true,
  });
  if (result.status !== 200) {
    throw new Error(result.data);
  }
  return result.data;
};
