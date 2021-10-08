import axios from "axios";

export const fetcher = async (url: string, cookies?: any) => {
  const result = await axios.get(url, {
    headers: cookies ? { cookie: cookies } : undefined,
    withCredentials: true,
  });
  if (result.status !== 200) {
    throw new Error(result.data);
  }
  return result.data;
};
