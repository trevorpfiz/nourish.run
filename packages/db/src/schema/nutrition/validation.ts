import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import type { FoodItem } from "..";
import { nutrition } from "./nutrition";

export const insertNutritionSchema = createInsertSchema(nutrition);

export const selectNutritionSchema = createSelectSchema(nutrition);

export type InsertNutrition = z.infer<typeof insertNutritionSchema>;
export type Nutrition = z.infer<typeof selectNutritionSchema>;

// @link https://github.com/drizzle-team/drizzle-orm/issues/695
export type NutritionWithFoodItem = Nutrition & {
  foodItem: FoodItem;
};
