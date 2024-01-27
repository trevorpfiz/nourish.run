import { z } from "zod";

import { and, desc, eq, gte, lt, schema } from "@nourish/db";
import { nutrition } from "@nourish/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const mealRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.meal.findMany({
      orderBy: desc(schema.meal.id),
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

      return ctx.db.query.nutrition
        .findMany({
          where: and(
            eq(nutrition.user_id, ctx.session.user.id),
            gte(nutrition.time, dateObj),
            lt(nutrition.time, nextDay),
          ),
          with: {
            meal: true,
          },
          orderBy: desc(nutrition.time),
        })
        .then((nutritionItems) => {
          // Group nutrition items by meal_id
          const mealsByDay = nutritionItems.reduce((acc, item) => {
            if (!acc[item.meal_id]) {
              acc[item.meal_id] = {
                mealId: item.meal_id,
                nutritionItems: [],
                time: item.time, // you might want to adjust this based on your needs
              };
            }
            acc[item.meal_id].nutritionItems.push(item);
            return acc;
          }, {});

          return Object.values(mealsByDay);
        });
    }),
});
