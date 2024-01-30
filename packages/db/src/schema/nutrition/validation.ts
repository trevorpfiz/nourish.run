import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import type { InferResultType } from "../../types/infer-relations";
import { nutrition } from "./nutrition";

export const insertNutritionSchema = createInsertSchema(nutrition);

export const selectNutritionSchema = createSelectSchema(nutrition);

export type InsertNutrition = z.infer<typeof insertNutritionSchema>;
export type Nutrition = z.infer<typeof selectNutritionSchema>;

export type NutritionWithFoodItem = InferResultType<
  "nutrition",
  { foodItem: true }
>;
