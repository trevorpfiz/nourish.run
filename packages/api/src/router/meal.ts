import { z } from "zod";

import { and, asc, desc, eq, gte, lt, schema } from "@nourish/db";
import { meal } from "@nourish/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const mealRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.meal.findMany({
      orderBy: desc(schema.meal.id),
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.meal.findFirst({
        where: eq(schema.meal.id, input.id),
        with: {
          nutrition: {
            with: {
              foodItem: true,
            },
          },
        },
      });
    }),

  byDay: protectedProcedure
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const { date } = input;
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj.getTime() + 24 * 60 * 60 * 1000);

      const meals = ctx.db.query.meal.findMany({
        where: and(
          eq(meal.user_id, ctx.session.user.id),
          gte(meal.startTime, dateObj),
          lt(meal.startTime, nextDay),
        ),
        orderBy: asc(meal.startTime),
        with: {
          nutrition: {
            with: {
              foodItem: true,
            },
          },
        },
      });

      return meals;
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(schema.meal).where(eq(schema.meal.id, input));
    }),
});
