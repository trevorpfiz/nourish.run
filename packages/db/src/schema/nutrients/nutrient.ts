import { relations } from "drizzle-orm";
import { decimal, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { foodItemsToNutrients } from "..";
import { mySqlTable } from "../_table";

export const nutrient = mySqlTable("nutrient", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }),
  class: varchar("class", { length: 100 }),
  group_name: varchar("group_name", { length: 100 }),
  name: varchar("name", { length: 100 }),
  unit: varchar("unit", { length: 20 }),
  daily_value: decimal("daily_value", { precision: 10, scale: 4 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const nutrientRelations = relations(nutrient, ({ many }) => ({
  foodItemsToNutrients: many(foodItemsToNutrients),
}));
