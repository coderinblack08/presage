import axios from "axios";
import { apiBaseURL } from "./constants";

export const defaultMutationFn = async ([path, body, method = "post"]: [
  string,
  any,
  "post" | "put" | "delete"
]) => {
  try {
    const r = await axios[method](apiBaseURL + path, body, {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });

    if (r.status !== 200) {
      throw new Error(r.data);
    }

    return r.data;
  } catch (error) {
    console.error(error);
  }
};
