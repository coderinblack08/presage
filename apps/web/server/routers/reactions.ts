import { ReactionType } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const reactionsRouter = createRouter()
  .query("byDraftId", {
    input: z.object({ id: z.string() }),
    resolve: async ({ ctx, input }) => {
      const counts = await ctx.prisma.reactionCount.findMany({
        where: { draftId: input.id },
      });
      const output = {
        status: {} as Record<ReactionType, boolean>,
        counts: counts.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {} as Record<ReactionType, number>),
      };
      if (ctx.session) {
        const myReactions = await ctx.prisma.reaction.findMany({
          where: {
            userId: ctx.session.user.id,
            draftId: input.id,
          },
        });
        output.status = Object.values(ReactionType).reduce((acc, curr) => {
          acc[curr] = myReactions.some((r) => r.type === curr);
          return acc;
        }, {} as Record<ReactionType, boolean>);
      }
      return output;
    },
  })
  .mutation("toggle", {
    meta: { hasAuth: true },
    input: z.object({
      draftId: z.string(),
      type: z.nativeEnum(ReactionType),
    }),
    resolve: async ({ ctx, input }) => {
      const body = { ...input, userId: ctx.session!.user.id };
      const reaction = await ctx.prisma.reaction.findFirst({ where: body });
      if (reaction) {
        await ctx.prisma.reaction.delete({
          where: { type_draftId_userId: body },
        });
      } else {
        await ctx.prisma.reaction.create({ data: body });
      }
    },
  });
