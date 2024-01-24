import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { meal } from "./meal";

export const insertMealSchema = createInsertSchema(meal);

export const selectMealSchema = createSelectSchema(meal);

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = z.infer<typeof selectMealSchema>;
