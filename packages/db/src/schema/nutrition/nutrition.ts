import { relations } from "drizzle-orm";
import {
  bigint,
  decimal,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { foodItem, meal } from "..";
import { mySqlTable } from "../_table";
import { users } from "../auth";

export const nutrition = mySqlTable("nutrition", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  food_item_id: bigint("food_item_id", {
    mode: "number",
    unsigned: true,
  }).notNull(),
  meal_id: bigint("meal_id", {
    mode: "number",
    unsigned: true,
  }).notNull(),
  serving_size: varchar("serving_size", { length: 100 }),
  servings: decimal("servings", { precision: 8, scale: 3 }),
  time: timestamp("time"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const nutritionRelations = relations(nutrition, ({ one }) => ({
  user: one(users, {
    fields: [nutrition.user_id],
    references: [users.id],
  }),
  foodItem: one(foodItem, {
    fields: [nutrition.food_item_id],
    references: [foodItem.id],
  }),
  meal: one(meal, {
    fields: [nutrition.meal_id],
    references: [meal.id],
  }),
}));
