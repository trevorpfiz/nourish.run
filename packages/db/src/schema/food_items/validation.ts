import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { foodItem } from "./food_item";

export const insertFoodItemSchema = createInsertSchema(foodItem);

export const selectFoodItemSchema = createSelectSchema(foodItem);

export type InsertFoodItem = z.infer<typeof insertFoodItemSchema>;
export type FoodItem = z.infer<typeof selectFoodItemSchema>;
