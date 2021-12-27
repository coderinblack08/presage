import axios from "axios";
import { API_URL } from "../../constants";

export const defaultMutationFn = async ([path, body, method = "POST"]: [
  string,
  any,
  "POST" | "PUT" | "PATCH" | "DELETE"
]) => {
  const r = await axios(API_URL + path, {
    method,
    data: body,
    withCredentials: true,
  });
  return r.data;
};
