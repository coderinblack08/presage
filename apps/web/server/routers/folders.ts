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
  .mutation("delete", {
    meta: { hasAuth: true },
    input: z.object({ id: z.string() }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.folder.delete({ where: input });
    },
  });
