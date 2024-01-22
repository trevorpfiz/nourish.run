import { relations } from "drizzle-orm";
import {
  bigint,
  decimal,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { nutrients, nutrition } from "..";
import { mySqlTable } from "../_table";

export const foodItems = mySqlTable("food_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  food_category: varchar("food_category", { length: 50 }),
  serving_sizes: text("serving_sizes"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const foodItemsRelations = relations(foodItems, ({ many }) => ({
  nutrition: many(nutrition),
  foodItemsToNutrients: many(foodItemsToNutrients),
}));

export const foodItemsToNutrients = mySqlTable(
  "food_items_to_nutrients",
  {
    food_item_id: bigint("food_item_id", {
      mode: "bigint",
      unsigned: true,
    }).notNull(),
    nutrient_id: bigint("nutrient_id", {
      mode: "bigint",
      unsigned: true,
    }).notNull(),
    quantity_per_100g: decimal("quantity_per_100g", {
      precision: 10,
      scale: 4,
    }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.food_item_id, t.nutrient_id],
    }),
  }),
);

export const foodItemsToNutrientsRelations = relations(
  foodItemsToNutrients,
  ({ one }) => ({
    foodItem: one(foodItems, {
      fields: [foodItemsToNutrients.food_item_id],
      references: [foodItems.id],
    }),
    nutrient: one(nutrients, {
      fields: [foodItemsToNutrients.nutrient_id],
      references: [nutrients.id],
    }),
  }),
);
