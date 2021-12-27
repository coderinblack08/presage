import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { API_URL } from "../../constants";

export const defaultQueryFn =
  (cookies?: any) =>
  async ({ queryKey }: QueryFunctionContext<any>) => {
    const result = await axios.get(`${API_URL}${queryKey[0]}`, {
      headers: cookies ? { cookie: cookies } : undefined,
      withCredentials: true,
    });
    if (result.status !== 200) {
      throw new Error(result.data);
    }
    return result.data;
  };
