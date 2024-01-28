import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import type { Nutrition } from "..";
import { meal } from "./meal";

export const insertMealSchema = createInsertSchema(meal);

export const selectMealSchema = createSelectSchema(meal);

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = z.infer<typeof selectMealSchema>;
// @link https://github.com/drizzle-team/drizzle-orm/issues/695
export type MealWithNutrition = Meal & {
  nutrition: Nutrition[];
};
