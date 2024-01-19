import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { foodItems } from "./food_items";

export const insertFoodItemSchema = createInsertSchema(foodItems);

export const selectFoodItemSchema = createSelectSchema(foodItems);

export type InsertFoodItem = z.infer<typeof insertFoodItemSchema>;
export type FoodItem = z.infer<typeof selectFoodItemSchema>;
