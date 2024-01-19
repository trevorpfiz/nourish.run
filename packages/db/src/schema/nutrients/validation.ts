import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { nutrients } from "./nutrients";

export const insertNutrientSchema = createInsertSchema(nutrients);

export const selectNutrientSchema = createSelectSchema(nutrients);

export type InsertNutrient = z.infer<typeof insertNutrientSchema>;
export type Nutrient = z.infer<typeof selectNutrientSchema>;
