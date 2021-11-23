import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { admin } from "../admin";

export const verifySessionCookie = async (
  req:
    | NextApiRequest
    | {
        cookies: NextApiRequestCookies;
        [key: string]: any;
      }
) => {
  return admin.auth.verifySessionCookie(req.cookies.jid || "", true);
};
