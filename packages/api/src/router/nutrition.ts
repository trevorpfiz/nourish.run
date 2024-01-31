import { differenceInMinutes } from "date-fns";
import { z } from "zod";

import type { MealWithNutrition } from "@nourish/db/src/schema";
import { and, desc, eq, gte, inArray, schema } from "@nourish/db";
import { insertNutritionSchema, meal } from "@nourish/db/src/schema";
import { ReviewFoodsFormSchema } from "@nourish/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getFirstServingSize } from "../utils";

export const nutritionRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.nutrition.findMany({
      orderBy: desc(schema.nutrition.id),
      limit: 10,
      with: {
        foodItem: true,
      },
    });
  }),

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

      // Fetch recent meals
      const fetchRecentMeals = async () => {
        return await ctx.db.query.meal.findMany({
          where: and(
            eq(meal.user_id, ctx.session.user.id),
            gte(
              meal.startTime,
              new Date(inputTime.getTime() - 4 * 60 * 60 * 1000), // 4hrs ago
            ),
          ),
          with: {
            nutrition: true,
          },
        });
      };

      // meal grouping algorithm
      const determineMealId = async (recentMeals: MealWithNutrition[]) => {
        for (const meal of recentMeals) {
          const mealStartTime = meal.startTime
            ? new Date(meal.startTime)
            : null;

          if (mealStartTime) {
            const startTimeDiff = Math.abs(
              differenceInMinutes(inputTime, mealStartTime),
            );

            // If time difference is ≥ 2hrs, create a new meal
            if (startTimeDiff >= 120) {
              break;
            }

            // Get the latest nutrition item time in the current meal
            let latestNutritionTime = mealStartTime;
            if (meal.nutrition.length > 0) {
              const latestNutritionItem =
                meal.nutrition[meal.nutrition.length - 1];
              if (latestNutritionItem?.time) {
                latestNutritionTime = new Date(latestNutritionItem.time);
              }
            }

            const nutritionTimeDiff = Math.abs(
              differenceInMinutes(inputTime, latestNutritionTime),
            );

            // If time difference is ≤ 30mins, use this meal
            if (nutritionTimeDiff <= 30) {
              return meal.id;
            }
          }
        }

        // Create a new meal if no existing meal fits
        const newMeal = await ctx.db.insert(schema.meal).values({
          user_id: ctx.session.user.id,
          startTime: inputTime, // Set the startTime to the inputTime for the new meal
        });
        return newMeal.insertId;
      };

      // Fetch recent meals
      const recentMeals = await fetchRecentMeals();

      // Determine meal ID
      const mealId = await determineMealId(recentMeals);

      // construct nutrition entries
      const formattedFoods = foods.map((food) => ({
        user_id: ctx.session.user.id,
        food_item_id: food.foodId,
        meal_id: Number(mealId),
        serving_size: getFirstServingSize(food.size),
        servings: String(food.quantity), // FIXME: is there a better way to do this?
        time: inputTime,
      }));

      return ctx.db.insert(schema.nutrition).values(formattedFoods);
    }),

  update: protectedProcedure
    .input(insertNutritionSchema.partial())
    .mutation(({ ctx, input }) => {
      if (!input.id) return;

      return ctx.db
        .update(schema.nutrition)
        .set(input)
        .where(eq(schema.nutrition.id, input.id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.nutrition)
      .where(eq(schema.nutrition.id, input));
  }),

  deleteMany: protectedProcedure
    .input(z.array(z.number()))
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      return ctx.db
        .delete(schema.nutrition)
        .where(inArray(schema.nutrition.id, input));
    }),
});
