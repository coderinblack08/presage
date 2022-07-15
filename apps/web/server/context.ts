import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

import { prisma } from "./prisma";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  // const session = await getSessionFromCookie({ req: req as NextApiRequest });
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    req,
    res,
    session,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
