import { relations } from "drizzle-orm";
import { decimal, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { foodItems } from "..";
import { mySqlTable } from "../_table";
import { users } from "../auth";

export const nutrition = mySqlTable("nutrition", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 191 }).notNull(),
  food_item_id: varchar("food_item_id", { length: 191 }).notNull(),
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
  foodItem: one(foodItems, {
    fields: [nutrition.food_item_id],
    references: [foodItems.id],
  }),
}));
