import axios from "axios";
import { apiBaseURL } from "./constants";

export const defaultMutationFn = async ([path, body, method = "post"]: [
  string,
  any,
  "post" | "put" | "delete"
]) => {
  const r = await axios[method](apiBaseURL + path, body, {
    headers: {
      "content-type": "application/json",
    },
  });

  if (r.status !== 200) {
    throw new Error(await r.data);
  }

  return r.data;
};
