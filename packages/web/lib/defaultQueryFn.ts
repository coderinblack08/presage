import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { apiBaseURL } from "./constants";

export const defaultQueryFn = (cookies?: any) => async ({
  queryKey,
}: QueryFunctionContext<any>) => {
  console.log(`${apiBaseURL}${queryKey[0]}`);
  const result = await axios.get(`${apiBaseURL}${queryKey[0]}`, {
    headers: cookies ? { cookie: cookies } : undefined,
    withCredentials: true,
  });
  if (result.status !== 200) {
    throw new Error(result.data);
  }
  return result.data;
};
