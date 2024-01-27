import { z } from "zod";

import type { Nutrition } from "@nourish/db/src/schema";
import { and, eq, gte, schema } from "@nourish/db";
import { nutrition, users } from "@nourish/db/src/schema";
import { ReviewFoodsFormSchema } from "@nourish/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const nutritionRouter = createTRPCRouter({
  createMany: protectedProcedure
    .input(
      z.object({
        ...ReviewFoodsFormSchema.shape,
        time: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { foods, time } = input;
      const inputTime = new Date(time);

      // Fetch recent nutrition items and their meal relation
      const recentNutritionItems = await ctx.db.query.nutrition.findMany({
        where: and(
          eq(users.id, ctx.session.user.id),
          gte(
            nutrition.time,
            new Date(inputTime.getTime() - 4 * 60 * 60 * 1000), // 4hrs ago
          ),
        ),
        with: {
          meal: true,
        },
      });

      // Group nutrition items by meal_id
      interface MealWithNutritionItems {
        mealId: number;
        nutritionItems: Nutrition[];
        time: Date | null;
      }
      type GroupedNutrition = Record<number, MealWithNutritionItems>;

      const groupedNutrition = recentNutritionItems.reduce(
        (acc: GroupedNutrition, item: Nutrition) => {
          const mealId = item.meal_id;

          if (!acc[mealId]) {
            acc[mealId] = {
              mealId: mealId,
              nutritionItems: [],
              time: item.time,
            };
          }

          acc[mealId]?.nutritionItems.push(item);

          return acc;
        },
        {} as GroupedNutrition,
      );

      // meal grouping algorithm
      const determineMealId = async () => {
        for (const mealId in groupedNutrition) {
          const items = groupedNutrition[mealId];
          const firstItemTime = new Date(items[0].time);
          const timeDiff = Math.abs(inputTime - firstItemTime);

          // If time difference is ≤ 30mins with any item, use this meal
          if (
            items.some(
              (item) =>
                Math.abs(inputTime - new Date(item.time)) <= 30 * 60 * 1000,
            )
          ) {
            return mealId;
          }

          // If time difference with the first item is ≥ 2hrs, create a new meal
          if (timeDiff >= 2 * 60 * 60 * 1000) {
            break;
          }
        }

        // Create a new meal if no existing meal fits
        const newMeal = await ctx.db.insert(schema.meal).values({
          user_id: ctx.session.user.id,
        });
        return newMeal.insertId;
      };

      const mealId = await determineMealId();

      // construct nutrition entries
      const formattedFoods = foods.map((food) => ({
        user_id: ctx.session.user.id,
        food_item_id: food.foodId,
        meal_id: Number(mealId),
        serving_size: food.size,
        servings: String(food.quantity), // FIXME: is there a better way to do this?
        time: inputTime,
      }));

      return ctx.db.insert(schema.nutrition).values(formattedFoods);
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.nutrition)
      .where(eq(schema.nutrition.id, input));
  }),
});
