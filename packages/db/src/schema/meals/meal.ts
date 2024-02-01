import { relations } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { nutrition } from "..";
import { mySqlTable } from "../_table";

export const meal = mySqlTable("meal", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  startTime: timestamp("startTime").notNull().defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const mealRelations = relations(meal, ({ many }) => ({
  nutrition: many(nutrition),
}));
