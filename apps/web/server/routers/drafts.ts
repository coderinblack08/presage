import { Draft, Folder } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";

async function convertMaterializedPaths(data: any[]) {
  const o: any = {};
  for (const { id, path, ...rest } of data) {
    const parent = path[path.length - 2];
    Object.assign((o[id] = o[id] || {}), {
      id,
      path,
      ...rest,
      drafts: await prisma.draft.findMany({
        where: {
          folderId: id,
        },
      }),
    });
    o[parent] = o[parent] || {};
    o[parent].children = o[parent].children || [];
    o[parent].children.push(o[id]);
  }
  return o.undefined.children;
}

export const draftsRouter = createRouter()
  .mutation("add", {
    meta: { hasAuth: true },
    input: z.object({
      title: z.string(),
      folderId: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.draft.create({
        data: { ...input, userId: ctx.session?.user.id! },
      });
    },
  })
  .mutation("delete", {
    meta: { hasAuth: true },
    input: z.object({ id: z.string() }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.draft.delete({ where: input });
    },
  })
  .mutation("update", {
    meta: { hasAuth: true },
    input: z.object({
      id: z.string(),
      title: z.string().optional(),
      content: z.string().optional(),
      folderId: z.string().optional(),
      published: z.boolean().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      const draft = await ctx.prisma.draft.findFirstOrThrow({
        where: { id: input.id },
      });
      if (draft.userId !== ctx.session?.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.prisma.draft.update({
        where: { id: input.id },
        data: { ...input },
      });
    },
  })
  .query("recursive", {
    meta: { hasAuth: true },
    resolve: async ({ ctx }) => {
      const result = await ctx.prisma.$queryRaw<any[]>`
      with recursive cte (id, name, "parentId", "userId", path, depth) as (

        select id, name, "parentId", "userId", array[id] as path, 1 as depth
        from "Folder"
        where "parentId" is null and "userId" = ${ctx.session?.user.id}

        union all

        select "Folder".id, 
          "Folder".name, 
          "Folder"."parentId", 
          "Folder"."userId",
          cte.path || "Folder".id as path,
          cte.depth + 1 as depth
        from "Folder"
        join cte on "Folder"."parentId" = cte.id

      ) select * from cte order by path;
      `;

      type Node = Folder & {
        depth: number;
        path: string[];
        children: Node[];
        drafts: Draft[];
      };

      const output = {
        depth: 0,
        path: [],
        children: result.length
          ? ((await convertMaterializedPaths(result)) as Node[])
          : [],
        drafts: await ctx.prisma.draft.findMany({ where: { folderId: null } }),
      };
      return output;
    },
  })
  .query("byId", {
    input: z.object({ id: z.string() }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.draft.findFirstOrThrow({ where: input });
    },
  });
