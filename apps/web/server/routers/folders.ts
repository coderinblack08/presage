import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const folderRouter = createRouter()
  .query("byId", {
    input: z.object({ id: z.string() }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.folder.findFirstOrThrow({ where: input });
    },
  })
  .query("all", {
    meta: { hasAuth: true },
    resolve: async ({ ctx }) => {
      return ctx.prisma.folder.findMany({
        where: {
          userId: ctx.session?.user.id!,
        },
      });
    },
  })
  .mutation("add", {
    meta: { hasAuth: true },
    input: z.object({
      name: z.string(),
      parentId: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.folder.create({
        data: { ...input, userId: ctx.session?.user.id! },
      });
    },
  })
  .mutation("update", {
    meta: { hasAuth: true },
    input: z.object({
      id: z.string(),
      name: z.string().optional(),
      parentId: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      const folder = await ctx.prisma.folder.findFirstOrThrow({
        where: { id: input.id },
      });
      if (folder.userId !== ctx.session?.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.prisma.folder.update({
        where: { id: input.id },
        data: { ...input },
      });
    },
  })
  .mutation("delete", {
    meta: { hasAuth: true },
    input: z.object({ id: z.string() }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.folder.delete({ where: input });
    },
  });
