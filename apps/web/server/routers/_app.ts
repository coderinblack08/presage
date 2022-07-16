/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from "../createRouter";
import superjson from "superjson";
import { folderRouter } from "./folders";
import { TRPCError } from "@trpc/server";
import { draftsRouter } from "./drafts";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  .middleware(async ({ ctx, meta, next }) => {
    if (!ctx.session?.user && meta?.hasAuth) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  /**
   * Add a health check endpoint to be called with `/api/trpc/healthz`
   */
  .query("healthz", {
    async resolve() {
      return "yay!";
    },
  })
  .merge("folders.", folderRouter)
  .merge("drafts.", draftsRouter);

export type AppRouter = typeof appRouter;
