import { API_URL } from "../../constants";

export const defaultMutationFn = async ([path, body, method = "POST"]: [
  string,
  any,
  "POST" | "PUT" | "PATCH"
]) => {
  const r = await fetch(API_URL + path, {
    method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
  if (r.status !== 201 && r.status !== 200) {
    throw new Error(await r.text());
  }
  return await r.json();
};
