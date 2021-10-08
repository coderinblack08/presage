import { NextApiRequest } from "next";
import { admin } from "../admin";

export const verifySessionCookie = async (req: NextApiRequest) => {
  return admin.auth.verifySessionCookie(req.cookies.jid, true);
};
