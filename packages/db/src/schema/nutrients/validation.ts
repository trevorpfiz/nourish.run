import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { nutrient } from "./nutrient";

export const insertNutrientSchema = createInsertSchema(nutrient);

export const selectNutrientSchema = createSelectSchema(nutrient);

export type InsertNutrient = z.infer<typeof insertNutrientSchema>;
export type Nutrient = z.infer<typeof selectNutrientSchema>;
